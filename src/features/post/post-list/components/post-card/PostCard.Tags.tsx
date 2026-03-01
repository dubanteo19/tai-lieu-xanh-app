import { TagList } from "@/features/tag/components/TagList";
import { usePostCard } from "./PostCard.context";
export const PostCardTags = () => {
  const { post } = usePostCard();
  if (!post.tags?.length) return null;
  return (
    <div className="flex pb-2 gap-2 items-center">
      <p>Nhãn:</p>
      <TagList tags={post.tags} />
    </div>
  );
};
