import { PostSummary } from "@/features/post/types/post.type";
import { FavoritePostItem } from "./FavofiteItem";

interface FavoriteListProps {
  items: PostSummary[];
}
export const FavoriteList = ({ items }: FavoriteListProps) => {
  if (!items.length)
    return <h3>Chưa có tài liệu nào trong danh sách yêu thích</h3>;
  return (
    <div className="mt-2 px-10 gap-10 flex-col">
      {items.map((post) => (
        <FavoritePostItem {...post} key={post.id} />
      ))}
    </div>
  );
};
