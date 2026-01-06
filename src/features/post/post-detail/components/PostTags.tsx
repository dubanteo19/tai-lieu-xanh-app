import { ITag } from "@/type/ITag";
import { FC } from "react";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
interface PostTagsProps {
  tags: ITag[];
}
export const PostTags: FC<PostTagsProps> = ({ tags }) => {
  return (
    <div className="flex my-2 gap-2">
      <p>Nhãn:</p>
      {tags &&
        tags.map((tag) => (
          <Link key={tag.tagName} to={`/search?tags=${tag.tagName}`}>
            <Badge variant="outline">{tag.tagName}</Badge>
          </Link>
        ))}
    </div>
  );
};
