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
export const store = configureStore({
  reducer: {
    auth: authSlice,
    userMenu: userMenuSlice,
    comment: commentSlice,
    [postApi.reducerPath]: postApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [majorApi.reducerPath]: majorApi.reducer,
    [mDocApi.reducerPath]: mDocApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      authApi.middleware,
      userApi.middleware,
      majorApi.middleware,
      commentApi.middleware,
      mDocApi.middleware,
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
