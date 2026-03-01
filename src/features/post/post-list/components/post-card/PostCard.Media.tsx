import { ImageHolder } from "@/shared/ui/image-holder";
import { usePostCard } from "./PostCard.context";
import { useNavigate } from "react-router-dom";

export const PostCardMedia = () => {
  const { post } = usePostCard();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`post/${post.id}`);
      }}
      className="max-w-[200px] md:max-w-[200px] cursor-pointer mx-auto border-primary border-2"
    >
      <ImageHolder width={200} height={100} src={post.thumbnail} />
    </div>
  );
};
