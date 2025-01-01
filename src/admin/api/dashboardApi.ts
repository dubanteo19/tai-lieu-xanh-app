import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../api/url";
export interface IDashboardInfo {
  totalPosts: number;
  totalUsers: number;
  totalComments: number;
  totalDownloads: number;
}
export interface StatsCount {
  date: string;
  count: number;
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
    getPostCountsLastNDays: builder.query<StatsCount[], number>({
      query: (days) => `posts/posts-last-n-days?days=${days}`,
      transformResponse: (response: { [key: string]: number }) => {
        return Object.entries(response).map(([date, count]) => ({
          date,
          count,
        }));
      },
    }),
    getDownloadsCountsLastNDays: builder.query<StatsCount[], number>({
      query: (days) => `posts/downloads-last-n-days?days=${days}`,
      transformResponse: (response: { [key: string]: number }) => {
        return Object.entries(response).map(([date, count]) => ({
          date,
          count,
        }));
      },
    }),
    getCommentsCountsLastNDays: builder.query<StatsCount[], number>({
      query: (days) => `posts/comments-last-n-days?days=${days}`,
      transformResponse: (response: { [key: string]: number }) => {
        return Object.entries(response).map(([date, count]) => ({
          date,
          count,
        }));
      },
    }),
  }),
});

export const {
  useGetDashboardInfoQuery,
  useGetDownloadsCountsLastNDaysQuery,
  useGetCommentsCountsLastNDaysQuery,
  useGetPostCountsLastNDaysQuery,
} = dashboardApi;
