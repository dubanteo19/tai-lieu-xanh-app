import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { IPost } from "../type/IPost";
import { IPostDetail } from "../type/IPostDetail";
import { IMDoc } from "../type/IMDoc";
interface IPostCreate {
  title: string;
  description: string;
  majorId: number;
  tags: string[];
  authorId: number;
  mDoc: IMDoc;
}
interface IMajorWithPost {
  id: number;
  majorName: string;
  posts: number;
}
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getMajorsWithPosts: builder.query<IMajorWithPost[], void>({
      query: () => `posts/hot-majors`,
    }),
    getAllPosts: builder.query<IPost[], void>({
      query: () => `posts`,
    }),
    createPost: builder.mutation<IPost, IPostCreate>({
      query: (form) => ({
        url: "posts",
        method: "POST",
        body: form,
      }),
    }),
    getPostDetail: builder.query<IPostDetail, number>({
      query: (postId) => `posts/${postId}/detail`,
    }),
  }),
});
export const {
  useGetAllPostsQuery,
  useGetMajorsWithPostsQuery,
  useGetPostDetailQuery,
  useCreatePostMutation,
} = postApi;
