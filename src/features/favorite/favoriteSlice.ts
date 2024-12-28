import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../type/IPost";
const loadFavoriteFromLocalStorage = (): IFavoriteState[] => {
  const savedFavirite = localStorage.getItem("favorite");
  return savedFavirite ? JSON.parse(savedFavirite) : [];
};
export interface IFavoriteState {
  postId: number
}
const initialState: IFavoriteState[] = loadFavoriteFromLocalStorage();
const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    favoriteLoad(state) {
      return state;
    },
    favoriteAdd(state, action: PayloadAction<IFavoriteState>) {
      state.push(action.payload);
    },
    favoriteRemove(state, action: PayloadAction<IFavoriteState>) {
      return state.filter(p => p.postId !== action.payload.postId)
    },
  },
});
export default favoriteSlice.reducer;
export const { favoriteLoad, favoriteAdd, favoriteRemove } = favoriteSlice.actions;
