export interface IComment {
  id: number;
  postTitle: string;
  comment: string;
  parentComment: string;
  author: {
    fullName: string;
    avatarUrl: string;
  };
  status: string;
  createdAt: string;
}
