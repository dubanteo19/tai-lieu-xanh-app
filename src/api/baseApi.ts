import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { RootState } from "../app/store";
export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});
