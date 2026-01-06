import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  postId: number;
  commentId: number;
  content: string;
  userId: number;
  action: string;
}

const initialState: InitialState = {
  postId: 0,
  commentId: 0,
  userId: 0,
  content: "",
  action: "create",
};
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentForm: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});
export const { setCommentForm } = commentSlice.actions;
export default commentSlice.reducer;
