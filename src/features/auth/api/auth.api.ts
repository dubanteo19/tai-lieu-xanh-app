import BASE_URL from "@/shared/constants/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginValues } from "../schemas/login.schema";
import { RegisterValues } from "../schemas/register.schema";
import { LoginResponse, RegisterReponse } from "../types/auth.type";
import { setCredentials } from "../authSlice";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
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
} = authApi;
