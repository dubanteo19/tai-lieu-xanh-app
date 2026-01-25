import BASE_URL from "@/shared/constants/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tag } from "../types/tag.type";

export const tagApi = createApi({
  reducerPath: "tag",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllTags: builder.query<Tag[], void>({
      query: () => `tags`,
    }),
  }),
});
export const { useGetAllTagsQuery } = tagApi;
