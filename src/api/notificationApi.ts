import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
export interface INotification {
  id: number;
  content: string;
  createdDate: string;
  status: string;
}

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  tagTypes: ["Notification"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    sendNotification: builder.mutation<
      void,
      { userId: number; content: string }
    >({
      query: ({ userId, content }) => ({
        url: `notifications/create`,
        method: "POST",
        params: { userId, content },
      }),
      invalidatesTags: ["Notification"],
    }),
    getAllNotfications: builder.query<INotification[], { userId: number }>({
      query: ({ userId }) => `notifications/user/${userId}/all`,
      providesTags: ["Notification"],
    }),
    markReadNotificaiton: builder.mutation<void, { notificationId: number }>({
      query: ({ notificationId }) => ({
        url: `notifications/markAsRead/${notificationId}`,
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),
    getAllUnreadNotfications: builder.query<
      INotification[],
      { userId: number }
    >({
      query: ({ userId }) => `notifications/user/${userId}/unread`,
      providesTags: ["Notification"],
    }),
  }),
});
// Export the auto-generated hooks
export const {
  useGetAllNotficationsQuery,
  useMarkReadNotificaitonMutation,
  useGetAllUnreadNotficationsQuery,
  useSendNotificationMutation,
} = notificationApi;
