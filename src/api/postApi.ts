import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { IPost } from "../type/IPost";
import { IPostDetail } from "../type/IPostDetail";
import { ISearchFilters } from "../type/ISearchFilters";
interface IPostCreate {
  file: File;
  postRequest: {
    title: string;
    description: string;
    majorId: number;
    tags: string[];
    authorId: number;
  };
}
export interface IMajorWithPost {
  id: number;
  majorName: string;
  posts: number;
}
export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getMajorsWithPosts: builder.query<IMajorWithPost[], void>({
      query: () => `posts/hot-majors`,
    }),
    searchPosts: builder.query<IPost[], ISearchFilters>({
      query: (filters) => ({
        url: "posts/search",
        params: {
          majorId: filters.major,
          keyword: filters.keyword,
          fileType: filters.fileType,
          tags: filters.tags,
          sortBy: filters.sort,
          direction: filters.dir,
          size: 8,
          page: filters.page ?? 0,
        },
      }),
    }),
    getPostsByPostId: builder.query<IPost[], string>({
      query: (string) => `posts/id-list?ids=${string}`,
    }),
    getNewPosts: builder.query<IPost[], void>({
      query: () => `posts/new`,
    }),
    getHotPosts: builder.query<IPost[], void>({
      query: () => `posts/hot`,
    }),
    getRelatedPosts: builder.query<IPost[], { postId: number }>({
      query: ({ postId }) => `posts/related?postId=${postId}`,
    }),
    getAllPosts: builder.query<IPost[], { page: number; size: number }>({
      query: ({ page, size }) => `posts?page=${page}&size=${size}`,
    }),
    getAllPublishedPosts: builder.query<
      IPost[],
      { page: number; size: number }
    >({
      query: ({ page, size }) => `posts/published?page=${page}&size=${size}`,
    }),
    viewPost: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        url: `posts/${postId}/view`,
        method: "POST",
      }),
    }),
    createPost: builder.mutation<IPost, IPostCreate>({
      query: (form) => {
        const formData = new FormData();
        formData.append("file", form.file);
        formData.append("title", form.postRequest.title);
        formData.append("description", form.postRequest.description);
        formData.append("majorId", form.postRequest.majorId.toString());
        formData.append("tags", JSON.stringify(form.postRequest.tags)); // or append each tag individually
        formData.append("authorId", form.postRequest.authorId.toString());
        return {
          url: "posts",
          method: "POST",
          body: formData,
        };
      },
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
  useGetHotPostsQuery,
  useGetPostsByPostIdQuery,
  useGetNewPostsQuery,
  useSearchPostsQuery,
  useViewPostMutation,
  useGetRelatedPostsQuery,
  useGetMajorsWithPostsQuery,
  useGetPostDetailQuery,
  useCreatePostMutation,
} = postApi;
