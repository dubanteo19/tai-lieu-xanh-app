import { Major } from "@/features/major/types/major.type";
import { MDoc } from "@/features/mdoc/types/mdoc.type";
import { Tag } from "@/features/tag/types/tag.type";
import { Author } from "@/shared/types/author-type";

export interface PostSummary {
  id: number;
  title: string;
  author: Author;
  status: string;
  thumbnail: string;
  major: Major;
  tags?: Tag[];
  views: number;
  downloads: number;
  createdDate: string;
}
export interface PostDetail extends PostSummary {
  description: string;
  mdoc: MDoc;
}
