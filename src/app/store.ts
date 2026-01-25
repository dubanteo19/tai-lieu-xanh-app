import { configureStore } from "@reduxjs/toolkit";
import { adminCommentApi } from "../admin/api/adminCommentApi";
import { adminMajorApi } from "../admin/api/adminMajorApi";
import { adminPostApi } from "../admin/api/adminPostApi";
import { adminUserApi } from "../admin/api/adminUserApi";
import { dashboardApi } from "../admin/api/dashboardApi";
import { reportApi } from "../admin/api/reportApi";
import authSlice from "../features/auth/authSlice";
import favoriteSlice from "../features/favorite/favoriteSlice";
import favoriteMiddleware from "../features/middlewares/favoriteMiddleware";
import userMenuSlice from "../features/user-menu/userMenuSlice";
import { postApi } from "@/features/post/post-list/api/post.api";
import { authApi } from "@/features/auth/api/auth.api";
import { userApi } from "@/features/user/api/user.api";
import { majorApi } from "@/features/major/api/major.api";
import { mDocApi } from "@/features/mdoc/api/mDoc.api";
import { commentApi } from "@/features/comment/api/comment.api";
import { notificationApi } from "@/features/notification/api/notification.api";
import { tagApi } from "@/features/tag/api/tag.api";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    userMenu: userMenuSlice,
    favorite: favoriteSlice,
    [postApi.reducerPath]: postApi.reducer,
    [adminPostApi.reducerPath]: adminPostApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [majorApi.reducerPath]: majorApi.reducer,
    [mDocApi.reducerPath]: mDocApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [adminMajorApi.reducerPath]: adminMajorApi.reducer,
    [adminUserApi.reducerPath]: adminUserApi.reducer,
    [adminCommentApi.reducerPath]: adminCommentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      adminPostApi.middleware,
      authApi.middleware,
      userApi.middleware,
      majorApi.middleware,
      commentApi.middleware,
      mDocApi.middleware,
      reportApi.middleware,
      notificationApi.middleware,
      dashboardApi.middleware,
      adminMajorApi.middleware,
      adminUserApi.middleware,
      adminCommentApi.middleware,
      favoriteMiddleware,
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
