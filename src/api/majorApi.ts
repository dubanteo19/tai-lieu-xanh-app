import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { IMajor } from "../type/IMajor";
import { ITag } from "../type/ITag";

export const majorApi = createApi({
  reducerPath: "major",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllMajors: builder.query<IMajor[], void>({
      query: () => `majors`,
    }),
    getAlltags: builder.query<ITag[], void>({
      query: () => `tags`,
    }),
  }),
});
export const { useGetAllMajorsQuery, useGetAlltagsQuery } = majorApi;
