import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/app/config/baseApi";
import { PostSummary } from "@/features/post/types/post.type";
import { UserInfo } from "../types/user.type";
import { UpdatePasswordRequest } from "../types/user.request";

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
    getUserPosts: builder.query<PostSummary[], number>({
      query: (id) => `users/${id}/posts`,
      providesTags: ["Post"],
    }),
    getInfo: builder.query<UserInfo, number>({
      query: (id) => `users/${id}/info`,
      providesTags: (_, __, id) => [{ type: "UserInfo", id }],
    }),
    updateInfo: builder.mutation<UserInfo, FormData>({
      query: (formData) => ({
        url: `users/${formData.get("id")}/info`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (_, __, formData) => [
        { type: "UserInfo", id: Number(formData.get("id")) },
      ],
    }),
    deletePost: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        url: `users/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    updatePassword: builder.mutation<UserInfo, UpdatePasswordRequest>({
      query: (request) => ({
        url: `users/update-password`,
        method: "PUT",
        body: request,
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
