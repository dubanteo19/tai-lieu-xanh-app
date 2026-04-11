import { Avatar, IconButton } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { usePostCard } from "./PostCard.context";
import { Button } from "@/shared/ui/button";
import { getThumbUri } from "@/shared/utils/uri";
import {
  BookOpenIcon,
  CircleXIcon,
  PanelBottomCloseIcon,
  SidebarCloseIcon,
} from "lucide-react";
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
          <p className="text-gray-500 text-sm">{post.meta.createdDate}</p>
        </div>
      </div>
      <div className="flex-center gap-4">
        <div className="flex-center gap-4 ">
          <BookOpenIcon color="green" />
          <div className="px-4 font-bold  bg-white border-primary border-2 rounded-2xl  ">
            {post.major.name}
          </div>
        </div>
        |
        <Button
          className="md:size-15 color-primary"
          asChild
          variant={"ghost"}
          onClick={() => {
            handleHidePost?.(post.id);
          }}
        >
          <CircleXIcon />
        </Button>
      </div>
    </div>
  );
};
