export interface IPost {
  id: number;
  author: {
    avatar: string;
    fullName: string;
  };
  createdDate: string;
  title: string;
  status: string;
  thumb: string;
  major: string;
  tags?: string[];
  views: number;
  comments?: number;
  downloads: number;
}
