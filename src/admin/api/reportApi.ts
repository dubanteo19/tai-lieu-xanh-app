import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../api/url";
import { IPost } from "../../type/IPost";
export interface IReportCreate {
  postId: number;
  userId: number;
  reason: string;
}

export interface IReport {
  post: IPost;
  postTitle: string;
  postId: number;
  authorId: number;
  fullName: string;
  reason: string;
  createdDate: string;
  status: string;
}
export const reportApi = createApi({
  reducerPath: "reportApi",
  tagTypes: ["Report"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllReportPost: builder.query<
      IReport[],
      { page: number; size: number; status: string }
    >({
      query: ({ page, size, status }) => ({
        url: `reports/admin/reports`,
        method: "GET",
        params: { page, size, status },
      }),
      providesTags: ["Report"],
    }),
    updateReport: builder.mutation<
      string[],
      { reportId: number; status: string }
    >({
      query: ({ reportId, status }) => ({
        url: `reports/admin/updateReportStatus`,
        method: "POST",
        params: { reportId, status },
      }),
      invalidatesTags: ["Report"],
    }),
    getAllReasons: builder.query<string[], void>({
      query: () => `reports/report-reasons`,
    }),
    reportPost: builder.mutation<void, IReportCreate>({
      query: ({ postId, userId, reason }) => ({
        url: `reports/report-post`,
        method: "POST", // POST method
        params: { postId, userId, reason },
      }),
      invalidatesTags: ["Report"],
    }),
  }),
});

export const {
  useGetAllReasonsQuery,
  useReportPostMutation,
  useGetAllReportPostQuery,
  useUpdateReportMutation,
} = reportApi;
