import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
interface IUserInfo {
  fullName: string;
  bio: string;
  email: string;
  avatar: string;
  friends: number;
  posts: number;
}

export interface IUserUpdatePassword {
  id: number;
  password: string;
  newPassword: string;
}
export interface IUserUpdateInfo {
  id: number;
  fullName: string;
  bio: string;
}
export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["UserInfo"],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getInfo: builder.query<IUserInfo, number>({
      query: (id) => `users/${id}/info`,
      providesTags: (result, error, id) => [{ type: "UserInfo", id }],
    }),
    updateInfo: builder.mutation<IUserInfo, IUserUpdateInfo>({
      query: (info) => ({
        url: `users/${info.id}/info`,
        method: "PUT",
        body: info,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "UserInfo", id }],
    }),
    updatePassword: builder.mutation<IUserInfo, IUserUpdatePassword>({
      query: (form) => ({
        url: `users/${form.id}/update-password`,
        method: "PUT",
        body: form,
      }),
    }),
  }),
});
export const {
  useGetInfoQuery,
  useUpdateInfoMutation,
  useUpdatePasswordMutation,
} = userApi;
