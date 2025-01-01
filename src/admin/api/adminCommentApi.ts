import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../api/url";
import { ICommentRes } from "../../type/ICommentRes";
export const adminCommentApi = createApi({
  reducerPath: "adminCommentApi",
  tagTypes: ["Comment"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllComments: builder.query<ICommentRes[], void>({
      query: () => `comments`,
      providesTags: ["Comment"],
    }),
    deleteComment: builder.mutation<ICommentRes, { commentId: number }>({
      query: ({ commentId }) => ({
        url: `comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const { useGetAllCommentsQuery, useDeleteCommentMutation } =
  adminCommentApi;
