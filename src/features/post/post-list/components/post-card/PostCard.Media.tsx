import { ImageHolder } from "@/shared/ui/image-holder";
import { usePostCard } from "./PostCard.context";

export const PostCardMedia = () => {
  const { post } = usePostCard();
  return (
    <div className="max-w-[200px] md:max-w-[400px] mx-auto border-primary border-2">
      <ImageHolder width={200} height={100} src={post.thumbnail} />
    </div>
  );
};
