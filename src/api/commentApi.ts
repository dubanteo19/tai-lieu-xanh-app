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
}
export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQuery,
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<ICommentRes[], number>({
      query: (postId) => `comments/post/${postId}`,
      providesTags: (result, error, postId) => [{ type: "Comment", postId }],
    }),
    createComment: builder.mutation<ICommentRes, ICommentReq>({
      query: (request) => ({
        url: `comments/post/${request.postId}`,
        method: "POST",
        body: request,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Comment", userId },
      ],
    }),
    deleteComment: builder.mutation<ICommentRes, ICommentDeleteReq>({
      query: (request) => ({
        url: `comments/post/${request.postId}`,
        method: "DELETE",
        body: request,
      }),
      invalidatesTags: (result, error, { commentId }) => [
        { type: "Comment", commentId },
      ],
    }),
  }),
});
export const {
  useDeleteCommentMutation,
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
} = commentApi;
