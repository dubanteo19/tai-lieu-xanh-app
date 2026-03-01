import { usePostCard } from "./PostCard.context";

export const PostCardMeta = () => {
  const { post } = usePostCard();
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <p>{post.meta.views} Lượt xem</p>
        <p>{post.meta.downloads | 0} lượt tải</p>
        <p>{post.meta.likes | 0} lượt thích</p>
      </div>
    </div>
  );
};
