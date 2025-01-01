import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../api/url";
import { IMajorWithPost } from "../../api/postApi";
interface IMajorCreate {
  name: string;
}
interface IMajorUpdate {
  majorId: number;
  name: string;
}
export interface ITagWithPost {
  id: number;
  tagName: string;
  posts: number;
}
export const adminMajorApi = createApi({
  reducerPath: "adminMajorApi",
  tagTypes: ["Major"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getMajorsWithPosts: builder.query<IMajorWithPost[], void>({
      query: () => `majors/major-with-post`,
      providesTags: ["Major"],
    }),
    getTagsWithPosts: builder.query<ITagWithPost[], void>({
      query: () => `majors/tag-with-post`,
      providesTags: ["Major"],
    }),
    createMajor: builder.mutation<void, IMajorCreate>({
      query: (majorCreate) => ({
        url: `majors`,
        method: "POST",
        body: majorCreate,
      }),
      invalidatesTags: ["Major"],
    }),
    updateMajor: builder.mutation<void, IMajorUpdate>({
      query: (majorUpdate) => ({
        url: `majors/${majorUpdate.majorId}`,
        method: "PUT",
        body: majorUpdate,
      }),
      invalidatesTags: ["Major"],
    }),
  }),
});

export const {
  useGetMajorsWithPostsQuery,
  useGetTagsWithPostsQuery,
  useUpdateMajorMutation,
  useCreateMajorMutation,
} = adminMajorApi;
