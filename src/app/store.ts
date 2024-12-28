import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../api/postApi";
import authSlice from "../features/auth/authSlice";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import userMenuSlice from "../features/user-menu/userMenuSlice";
import { commentApi } from "../api/commentApi";
import commentSlice from "../features/comment/commentSlice";
import { majorApi } from "../api/majorApi";
import { mDocApi } from "../api/mDocApi";
import favoriteSlice from "../features/favorite/favoriteSlice";
import favoriteMiddleware from "../features/middlewares/favoriteMiddleware";
import { adminPostApi } from "../admin/api/adminPostApi";
import { reportApi } from "../admin/api/reportApi";
import { notificationApi } from "../api/notificationApi";
import { dashboardApi } from "../admin/api/dashboardApi";
import { adminMajorApi } from "../admin/api/adminMajorApi";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    userMenu: userMenuSlice,
    comment: commentSlice,
    favorite: favoriteSlice,
    [postApi.reducerPath]: postApi.reducer,
    [adminPostApi.reducerPath]: adminPostApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [majorApi.reducerPath]: majorApi.reducer,
    [mDocApi.reducerPath]: mDocApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [adminMajorApi.reducerPath]: adminMajorApi.reducer,
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
      favoriteMiddleware,
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
