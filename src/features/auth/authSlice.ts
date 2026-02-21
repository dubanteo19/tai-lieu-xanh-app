import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser, LoginResponse } from "./types/auth.type";
interface InitialState {
  accessToken: string | null;
  isLogin: boolean;
  userSummary: AuthUser | null;
}

const initialState: InitialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  isLogin: false,
  userSummary: {
    avatarUrl: "",
    email: "",
    fullName: "",
    id: 0,
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.userSummary = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLogin = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout: (state) => {
      state.accessToken = null;
      state.isLogin = false;
      state.userSummary = null;
      localStorage.removeItem("refreshToken");
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
