import { TagList } from "@/features/tag/components/TagList";
import { usePostCard } from "./PostCard.context";
export const PostCardTags = () => {
  const { post } = usePostCard();
  return (
    <div className="flex pb-2 gap-2">
      <p>Tags:</p>
      {post.tags && <TagList tags={post.tags} />}
    </div>
  );
};
