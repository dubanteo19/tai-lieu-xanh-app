import { Avatar } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { usePostCard } from "./PostCard.context";
import { Button } from "@/shared/ui/button";
import { getThumbUri } from "@/shared/utils/uri";
export const PostCardHeader = () => {
  const { post, handleHidePost } = usePostCard();
  const author = post.author;
  return (
    <div className="flex items-center justify-between bg-gray-100 px-4 rounded-xl">
      <div className="flex gap-4">
        <Avatar src={getThumbUri(author.avatarUrl || "")} />
        <div>
          <Link style={{ color: "black" }} to={`/profile/${author.id}`}>
            {author.fullName}
          </Link>
          <p className="text-gray-500 text-sm">{post.createdDate}</p>
        </div>
      </div>
      <Button
        className="rounded-full md:size-8 size-5 "
        variant={"ghost"}
        onClick={() => {
          handleHidePost?.(author.id);
        }}
      >
        <GridCloseIcon fontSize="small" />
      </Button>
    </div>
  );
};
