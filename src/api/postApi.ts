import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { IPost } from "../type/IPost";
import { IPostDetail } from "../type/IPostDetail";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], void>({
      query: () => `posts`,
    }),
    getPostDetail: builder.query<IPostDetail, number>({
      query: (postId) => `posts/${postId}/detail`,
    }),
  }),
});
export const { useGetAllPostsQuery, useGetPostDetailQuery } = postApi;
