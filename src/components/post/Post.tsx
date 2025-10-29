import { IPost } from "@/type/IPost";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Chip } from "@mui/material";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ImageHolder } from "../ui/image-holder";
import { PostFooter } from "./PostFooter";
import { PostHeader } from "./PostHeader";

interface PostProps {
  post: IPost;
  handleHidePost: (id: number) => void;
}
export const Post: FC<PostProps> = (props) => {
  const { handleHidePost, post } = props;
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-gray-100 rounded shadow-xl">
      <PostHeader
        author={post.author}
        postCreatedDate={post.createdDate}
        handleHidePost={handleHidePost}
      />
      <div className="flex flex-col gap-2 relative group">
        <Link to={`/post/${post.id}`} className="text-2xl font-bold py-4">
          <p>{post.title}</p>
        </Link>
        <div className=" group-hover:opacity-100 transition-all  absolute top-5 right-0  opacity-0">
          {post.major && (
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={() => {
                navigate(`/search?major=${post.major.id}`);
              }}
            >
              {post.major.majorName}
            </Button>
          )}
        </div>
        <div className="max-w-[200px] md:max-w-[400px] mx-auto border-primary border-2">
          <ImageHolder width={200} height={100} src={post.thumb} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center ">
          <VisibilityIcon />
          {post.views}
        </div>
        <div className="flex gap-2">
          <p>{post.comments} bình luận</p>
          <p>{post.downloads | 0} lượt tải</p>
        </div>
      </div>
      <div className="flex pb-2 gap-2">
        <p>Tags:</p>
        {post.tags &&
          post.tags.map((tag) => (
            <Chip
              key={tag}
              onClick={() => navigate(`/search?tags=${tag}`)}
              label={tag}
              size="small"
            />
          ))}
      </div>
      <PostFooter />
    </div>
  );
};
