import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../api/postApi";
import authSlice from "../features/auth/authSlice";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import userMenuSlice from "../features/user-menu/userMenuSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    userMenu: userMenuSlice,
    [postApi.reducerPath]: postApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;