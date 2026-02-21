import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_COMPONENTS, UserComponent } from "../user/constants";
interface InitialState {
  selectedComponent: UserComponent;
}

const initialState: InitialState = {
  selectedComponent: USER_COMPONENTS.UserProfile,
};
const userMenuSlice = createSlice({
  name: "userMenu",
  initialState,
  reducers: {
    setSlectedComponent: (state, action: PayloadAction<UserComponent>) => {
      state.selectedComponent = action.payload;
    },
  },
});
export const { setSlectedComponent } = userMenuSlice.actions;
export default userMenuSlice.reducer;
