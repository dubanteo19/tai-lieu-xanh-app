import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import BASE_URL from "@/shared/constants/url";
import { clearAuth, setCredentials } from "@/features/auth/authSlice";
import { LoginResponse } from "@/features/auth/types/auth.type";

const mutex = new Mutex();
const query = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token && !headers.has("x-skip-auth")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait if a refresh is happending
  await mutex.waitForUnlock();
  let result = await query(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const url = typeof args === "string" ? args : (args as FetchArgs).url;
    if (url.includes("auth/refresh")) {
      api.dispatch(clearAuth());
      return result;
    }
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await query(
          {
            url: "auth/refresh",
            method: "POST",
            credentials: "include",
            headers: {
              "x-skip-auth": "true",
            },
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          const data = refreshResult.data as LoginResponse;
          api.dispatch(setCredentials(data));
          result = await query(args, api, extraOptions);
        } else {
          api.dispatch(clearAuth());
        }
      } catch (error) {
        console.error(error);
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await query(args, api, extraOptions);
    }
  }
  return result;
};
