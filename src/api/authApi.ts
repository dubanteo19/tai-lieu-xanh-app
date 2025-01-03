import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
export interface IRegisterRes {
  messgae: string;
  email: string;
  id: number;
}
export interface IRegisterReq {
  email: string;
  password: string;
  fullName: string;
}
interface ILoginRes {
  token: string;
  fullName: string;
  bio: string;
  refreshToken: string;
  email: string;
  status: string;
  id: number;
}
interface ILoginReq {
  email: string;
  password: string;
}
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    forgot: builder.mutation<string, { email: string }>({
      query: ({ email }) => ({
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
    login: builder.mutation<ILoginRes, ILoginReq>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<IRegisterRes, IRegisterReq>({
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
} = authApi;
