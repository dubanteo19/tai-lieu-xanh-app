import { Author } from "@/shared/types/author-type";

export interface Comment {
  id: number;
  content: string;
  status: string;
  author: Author;
  createdDate: string;
}
