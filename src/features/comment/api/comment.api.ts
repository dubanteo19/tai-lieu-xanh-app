import { baseQuery } from "@/app/config/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Comment } from "../types/comment.type";
import { UpdateCommentRequest } from "../types/comment.request";
export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery,
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<Comment[], number>({
      query: (postId) => `comments/post/${postId}`,
      providesTags: (_, __, postId) => [{ type: "Comment", postId }],
    }),
    getCommentsByUserId: builder.query<Comment[], number>({
      query: (userId) => `comments/user/${userId}`,
      providesTags: (_, __, postId) => [{ type: "Comment", postId }],
    }),
    updateComment: builder.mutation<Comment, UpdateCommentRequest>({
      query: (request) => ({
        url: `comments/post/${request.postId}`,
        method: "PUT",
        body: request,
      }),
      invalidatesTags: (_, __, { commentId }) => [
        { type: "Comment", commentId },
      ],
    }),
    createComment: builder.mutation<Comment, UpdateCommentRequest>({
      query: (request) => ({
        url: `comments/post/${request.postId}`,
        method: "POST",
        body: request,
      }),
      invalidatesTags: (_, __, { commentId }) => [
        { type: "Comment", commentId },
      ],
    }),
  }),
});
export const {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useGetCommentsByUserIdQuery,
} = commentApi;
