import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  selectedComponent: string;
}

const initialState: InitialState = {
  selectedComponent: "UserProfile",
};
const userMenuSlice = createSlice({
  name: "userMenu",
  initialState,
  reducers: {
    setSlectedComponent: (state, action) => {
      state.selectedComponent = action.payload;
    },
  },
});
export const { setSlectedComponent } = userMenuSlice.actions;
export default userMenuSlice.reducer;
