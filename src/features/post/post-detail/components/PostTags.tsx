import { Tag } from "@/features/tag/types/tag.type";
import { Badge } from "@/shared/ui/badge";
import { Link } from "react-router-dom";
interface PostTagsProps {
  tags: Tag[];
}
export const PostTags = ({ tags }: PostTagsProps) => {
  return (
    <div className="flex my-2 gap-2">
      <p>Nhãn:</p>
      {tags.map((tag) => (
        <Link key={tag.id} to={`/search?tags=${tag.name}`}>
          <Badge variant="outline">{tag.name}</Badge>
        </Link>
      ))}
    </div>
  );
};
