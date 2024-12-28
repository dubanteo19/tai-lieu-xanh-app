import { IMajor } from "./IMajor";

export interface IPost {
  id: number;
  author: {
    avatar: string;
    fullName: string;
    id: number;
  };
  createdDate: string;
  title: string;
  status: string;
  thumb: string;
  major: IMajor;
  tags?: string[];
  views: number;
  comments?: number;
  downloads: number;
}
