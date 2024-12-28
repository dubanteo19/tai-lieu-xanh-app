import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../api/url";
interface IUser{
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export const adminUserApi = createApi({
  reducerPath: "adminUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query<IUser, void>({
      query: () => `dashboard/info`,
    }),
  }),
});

export const { useGetDashboardInfoQuery } = adminUserApi;
