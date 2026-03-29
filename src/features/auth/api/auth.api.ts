import { baseQuery } from "@/app/config/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../authSlice";
import { LoginValues } from "../schemas/login.schema";
import { RegisterValues } from "../schemas/register.schema";
import { AuthUser, LoginResponse, RegisterReponse } from "../types/auth.type";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    forgot: builder.mutation<string, string>({
      query: (email) => ({
        url: `auth/forgot-password?email=${email}`,
        method: "POST",
        responseHandler: "text",
      }),
    }),
    reset: builder.mutation<void, { token: string; password: string }>({
      query: (resetForm) => ({
        url: `auth/reset-password`,
        method: "POST",
        params: resetForm,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginValues>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    me: builder.query<AuthUser, void>({
      query: () => "auth/me",
    }),
    register: builder.mutation<RegisterReponse, RegisterValues>({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    verify: builder.mutation<string, string>({
      query: (token) => ({
        url: `auth/verify?token=${token}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useForgotMutation,
  useResetMutation,
  useMeQuery,
  useLogoutMutation,
} = authApi;
