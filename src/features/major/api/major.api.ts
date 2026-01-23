import BASE_URL from "@/shared/constants/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Major } from "../types/major.type";

export const majorApi = createApi({
  reducerPath: "major",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllMajors: builder.query<Major[], void>({
      query: () => `majors`,
    }),
  }),
});
export const { useGetAllMajorsQuery } = majorApi;
