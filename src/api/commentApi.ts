import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";
import { ICommentRes } from "../type/ICommentRes";
interface ICommentDeleteReq {
  commentId: number;
  postId: number;
  userId: number;
}
interface ICommentReq {
  content: string;
  postId: number;
  userId: number;
  commentId?: number;
}
export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQuery,
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<ICommentRes[], number>({
      query: (postId) => `comments/post/${postId}`,
      providesTags: (_, __, postId) => [{ type: "Comment", postId }],
    }),
    updateComment: builder.mutation<ICommentRes, ICommentReq>({
      query: (request) => ({
        url: `comments/post/${request.postId}`,
        method: "PUT",
        body: request,
      }),
      invalidatesTags: (_, __, { userId }) => [{ type: "Comment", userId }],
    }),
    createComment: builder.mutation<ICommentRes, ICommentReq>({
      query: (request) => ({
        url: `comments/post/${request.postId}`,
        method: "POST",
        body: request,
      }),
      invalidatesTags: (_, __, { userId }) => [{ type: "Comment", userId }],
    }),
    deleteComment: builder.mutation<ICommentRes, ICommentDeleteReq>({
      query: (request) => ({
        url: `comments/post/${request.postId}`,
        method: "DELETE",
        body: request,
      }),
      invalidatesTags: (_, __, { commentId }) => [
        { type: "Comment", commentId },
      ],
    }),
  }),
});
export const {
  useDeleteCommentMutation,
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
