export interface CreateCommentRequest {
  content: string;
  postId: number;
}
export interface UpdateCommentRequest extends CreateCommentRequest {
  commentId: number;
}
