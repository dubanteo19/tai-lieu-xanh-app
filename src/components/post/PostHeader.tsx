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
    <div className="flex items-center justify-between bg-gray-100 px-4 rounded-xl">
      <div className="flex gap-4">
        <Avatar src={getThumbUri(author.avatar || "")} />
        <div>
          <Link style={{ color: "black" }} to={`/profile/${author.id}`}>
            {author.fullName}
          </Link>
          <p className="text-gray-500 text-sm">{postCreatedDate}</p>
        </div>
      </div>
      <Button
        className="rounded-full md:size-8 size-5 "
        variant={"ghost"}
        onClick={() => {
          handleHidePost(author.id);
        }}
      >
        <GridCloseIcon fontSize="small" />
      </Button>
    </div>
  );
};
