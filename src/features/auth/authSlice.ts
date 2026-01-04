import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  accessToken: string | null;
  refreshToken: string | null;
  fullName: string;
  bio: string;
  avatar: string;
  isLogin: boolean;
  email: string;
  id: number;
}

const initialState: InitialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  fullName: "",
  bio: "",
  avatar: "",
  email: "",
  id: 0,
  isLogin: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isLogin: true,
      };
    },
    setAuthToken: (state, action) => {
      state.refreshToken = action.payload.accessToken;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("refreshToken", action.payload);
      localStorage.setItem("accessToken", action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isLogin = false;
      localStorage.removeItem("refreshToken");
    },
  },
});
export const { setAuthToken, logout } = authSlice.actions;
export default authSlice.reducer;
