import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { IMDoc } from "../type/IMDoc";

export const mDocApi = createApi({
  reducerPath: "mDoc",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    uploadMDoc: builder.mutation<IMDoc, {userId:number,file:File}>({
      query: (form) => {
        const formData = new FormData();
        formData.append("file", form.file);
        formData.append("userId", form.userId.toString());
        return {
          url: "documents/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});
export const { useUploadMDocMutation } = mDocApi;
