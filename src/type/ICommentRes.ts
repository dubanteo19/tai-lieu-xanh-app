export interface ICommentRes {
  id: number;
  content: string;
  postId: number;
  postTitle: string;
  status: string;
  author: {
    id: number;
    fullName: string;
    avatarUrl: string;
  };
  createdDate: string;
}
