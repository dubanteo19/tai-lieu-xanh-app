import BASE_URL from "@/shared/constants/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MDoc, PresignedUrl } from "../types/mdoc.type";

export const mDocApi = createApi({
  reducerPath: "mDoc",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    uploadMDoc: builder.mutation<MDoc, { file: File }>({
      query: (form) => {
        const formData = new FormData();
        formData.append("file", form.file);
        return {
          url: "documents/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
    getPreviewUrls: builder.query<string[], number>({
      query: (id) => `documents/${id}/previews`,
    }),
    getDocumentPresignedUrl: builder.query<PresignedUrl, number>({
      query: (id) => `posts/${id}/download`,
    }),
  }),
});
export const {
  useUploadMDocMutation,
  useLazyGetDocumentPresignedUrlQuery,
  useGetPreviewUrlsQuery,
} = mDocApi;
