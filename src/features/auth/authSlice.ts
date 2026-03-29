import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser, LoginResponse } from "./types/auth.type";
interface InitialState {
  accessToken: string | null;
  userSummary: AuthUser | null;
}

const initialState: InitialState = {
  accessToken: localStorage.getItem("accessToken"),
  userSummary: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.userSummary = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.userSummary = null;
      localStorage.removeItem("accessToken");
    },
  },
});
export const { setCredentials, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
