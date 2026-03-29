import { baseQuery } from "@/app/config/base-query";
import { SearchFilters } from "@/features/discovery/types/discovery.type";
import { Major } from "@/features/major/types/major.type";
import { CursorReponse } from "@/shared/types/cursor-response";
import { createApi } from "@reduxjs/toolkit/query/react";
import { CreatePostRequest } from "../../types/post.request";
import { PostDetail, PostSummary } from "../../types/post.type";
export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Post"],
  baseQuery,
  endpoints: (builder) => ({
    getMajorsWithPosts: builder.query<Major[], void>({
      query: () => `posts/hot-majors`,
    }),
    searchPosts: builder.query<PostSummary[], SearchFilters>({
      query: (filters) => ({
        url: "posts/search",
        params: {
          majorId: filters.majorId,
          keyword: filters.keyword,
          fileType: filters.fileType,
          tags: filters.tags,
          sortBy: filters.sortBy,
          direction: filters.direction,
          page: filters.page ?? 0,
        },
      }),
    }),
    getPostsByPostId: builder.query<PostSummary[], string>({
      query: (string) => `posts/id-list?ids=${string}`,
    }),
    getNewPosts: builder.query<PostSummary[], void>({
      query: () => `posts/new`,
    }),
    getHotPosts: builder.query<PostSummary[], void>({
      query: () => `posts/hot`,
    }),
    getRelatedPosts: builder.query<PostSummary[], { postId: number }>({
      query: ({ postId }) => `posts/related?postId=${postId}`,
    }),
    getAllPosts: builder.query<PostSummary[], { page: number; size: number }>({
      query: ({ page, size }) => `posts?page=${page}&size=${size}`,
    }),
    getAllPublishedPosts: builder.query<
      CursorReponse<PostSummary>,
      { nextCursor: string | null }
    >({
      query: ({ nextCursor }) => `posts?nextCursor=${nextCursor}`,
    }),
    viewPost: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        url: `posts/${postId}/view`,
        method: "POST",
      }),
    }),
    createPost: builder.mutation<PostSummary, CreatePostRequest>({
      query: (form) => {
        const formData = new FormData();
        const { file, postRequest } = form;
        const { title, description, majorId, tags } = postRequest;
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description ?? "");
        formData.append("majorId", majorId.toString());
        formData.append("tags", JSON.stringify(tags));
        return {
          url: "posts",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Post"],
    }),
    getPostDetail: builder.query<PostDetail, number>({
      query: (postId) => `posts/${postId}`,
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
