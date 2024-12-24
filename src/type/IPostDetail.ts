import { IMajor } from "./IMajor";
import { IMDoc } from "./IMDoc";
import { ITag } from "./ITag";

export interface IPostDetail {
  id: number;
  title: string;
  description: string;
  author: {
    id: number;
    fullName: string;
    avatar: string;
  };
  major: IMajor;
  tags: ITag[];
  mdoc: IMDoc;
  createdDate: string;
}
