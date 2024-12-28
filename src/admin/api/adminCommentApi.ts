import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../api/url";
export interface IDashboardInfo {
  totalPosts: number;
  totalUsers: number;
  totalComments: number;
  totalDownloads: number;
}
export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getDashboardInfo: builder.query<IDashboardInfo, void>({
      query: () => `dashboard/info`,
    }),
  }),
});

export const { useGetDashboardInfoQuery } = dashboardApi;
