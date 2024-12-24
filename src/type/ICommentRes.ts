export interface ICommentRes {
  id: number;
  content: string;
  author: {
    id: number;
    fullName: string;
    avatarUrl: string;
  };
  createdDate: string;
}
