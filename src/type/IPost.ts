import { IAuthor } from "@/type/IAuthor";
import { IMajor } from "@/type/IMajor";
export interface IPost {
  id: number;
  author: IAuthor;
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
