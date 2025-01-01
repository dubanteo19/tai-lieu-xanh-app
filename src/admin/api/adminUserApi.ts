import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../api/url";
interface IUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export const adminUserApi = createApi({
  reducerPath: "adminUserApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query<IUser[], void>({
      query: () => `users`,
      providesTags: ["User"],
    }),
    updateUserStatus: builder.mutation<
      void,
      { userId: number; status: string }
    >({
      query: ({ userId, status }) => ({
        url: `users/${userId}/status`,
        method: "PUT",
        params: { status },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUserQuery, useUpdateUserStatusMutation } = adminUserApi;
