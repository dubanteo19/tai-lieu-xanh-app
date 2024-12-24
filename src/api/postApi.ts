import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { IPost } from "../type/IPost";
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], void>({
      query: () => `posts`,
    }),
  }),
});
export const { useGetAllPostsQuery } = postApi;
