import { baseQuery } from "@/app/config/base-query";
import { PostSummary } from "@/features/post/types/post.type";
import { createApi } from "@reduxjs/toolkit/query/react";
import { UserInfo } from "../types/user.type";

export interface IUserUpdateInfo {
  id: number;
  fullName: string;
  bio: string;
}
export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["UserInfo", "Post"],
  baseQuery,
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
  }),
});
export const {
  useGetInfoQuery,
  useGetUserPostsQuery,
  useDeletePostMutation,
  useUpdateInfoMutation,
} = userApi;
