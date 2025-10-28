import { IAuthor } from "@/type/IAuthor";
import { getThumbUri } from "@/utils/uri";
import { GridCloseIcon } from "@mui/x-data-grid";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar } from "@mui/material";
interface PostHeaderProps {
  postCreatedDate: string;
  handleHidePost: (id: number) => void;
  author: IAuthor;
}
export const PostHeader: FC<PostHeaderProps> = (props) => {
  const { author, postCreatedDate, handleHidePost } = props;
  return (
    <div className="flex justify-center">
      <Avatar src={getThumbUri(author.avatar || "")} />
      <div>
        <Link style={{ color: "black" }} to={`/profile/${author.id}`}>
          {author.fullName}
        </Link>
        <p>{postCreatedDate}</p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            handleHidePost(author.id);
          }}
        >
          <GridCloseIcon />
        </Button>
      </div>
    </div>
  );
};
