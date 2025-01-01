import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../api/url";
import { IPost } from "../../type/IPost";
import { IPostDetail } from "../../type/IPostDetail";
interface IMajorWithPost {
  id: number;
  majorName: string;
  posts: number;
}
export const adminPostApi = createApi({
  reducerPath: "adminPostApi",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getMajorsWithPosts: builder.query<IMajorWithPost[], void>({
      query: () => `posts/hot-majors`,
      providesTags: ["Post"],
    }),
    getAllPosts: builder.query<IPost[], { page: number; size: number }>({
      query: ({ page, size }) => `posts?page=${page}&size=${size}`,
      providesTags: ["Post"],
    }),
    getAllPublishedPosts: builder.query<
      IPost[],
      { page: number; size: number }
    >({
      query: ({ page, size }) => `posts/published?page=${page}&size=${size}`,
      providesTags: ["Post"],
    }),
    getAllReviewPosts: builder.query<IPost[], { page: number; size: number }>({
      query: ({ page, size }) => `posts/review?page=${page}&size=${size}`,
      providesTags: ["Post"],
    }),
    getAllDeletedPosts: builder.query<IPost[], { page: number; size: number }>({
      query: ({ page, size }) => `posts/deleted?page=${page}&size=${size}`,
      providesTags: ["Post"],
    }),
    banPost: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        url: `posts/${postId}/ban`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),

    rejectPost: builder.mutation<void, { postId: number; reason: string }>({
      query: ({ postId, reason }) => ({
        url: `posts/${postId}/reject?reason=${reason}`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
    approvePost: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        url: `posts/${postId}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
    deepDeletePost: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        url: `posts/${postId}/deep-delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        url: `posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    getPostDetail: builder.query<IPostDetail, number>({
      query: (postId) => `posts/${postId}/detail`,
    }),
  }),
});
export const {
  useGetAllPostsQuery,
  useGetAllPublishedPostsQuery,
  useGetAllDeletedPostsQuery,
  useGetAllReviewPostsQuery,
  useGetMajorsWithPostsQuery,
  useGetPostDetailQuery,
  useDeletePostMutation,
  useDeepDeletePostMutation,
  useApprovePostMutation,
  useRejectPostMutation,
  useBanPostMutation,
} = adminPostApi;
