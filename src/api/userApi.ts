import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { IPost } from "../type/IPost";
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
  tagTypes: ["UserInfo", "Post"],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUserPosts: builder.query<IPost[], number>({
      query: (id) => `users/${id}/posts`,
      providesTags: ["Post"],
    }),
    getInfo: builder.query<IUserInfo, number>({
      query: (id) => `users/${id}/info`,
      providesTags: (_, __, id) => [{ type: "UserInfo", id }],
    }),
    updateInfo: builder.mutation<IUserInfo, FormData>({
      query: (formData) => ({
        url: `users/${formData.get("id")}/info`,
        method: "PUT",
        body: formData, // FormData object
      }),
      invalidatesTags: (_, __, formData) => [
        { type: "UserInfo", id: Number(formData.get("id")) },
      ],
    }),
    deletePost: builder.mutation<void, { postId: number; userId: number }>({
      query: ({ postId }) => ({
        url: `users/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
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
  useGetUserPostsQuery,
  useDeletePostMutation,
  useUpdateInfoMutation,
  useUpdatePasswordMutation,
} = userApi;
