import { usePostCard } from "./PostCard.context";

export const PostCardMeta = () => {
  const { post } = usePostCard();
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <p>{post.views} Luot xem</p>
        <p>{post.downloads | 0} lượt tải</p>
      </div>
    </div>
  );
};
