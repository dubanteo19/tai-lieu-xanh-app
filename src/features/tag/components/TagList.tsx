import { Tag } from "../types/tag.type";
import { TagItem } from "./TagItem";

interface TagListProps {
  tags: Tag[];
}
export const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="flex justify-center gap-2 ">
      {tags.map((tag) => (
        <TagItem key={tag.id} {...tag} />
      ))}
    </div>
  );
};
