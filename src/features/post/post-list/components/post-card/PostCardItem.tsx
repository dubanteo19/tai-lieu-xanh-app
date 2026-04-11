import { PostSummary } from "@/features/post/types/post.type";
import { NavLink } from "react-router-dom";
import { PostCard } from "./PostCard";
import { PostCardTags } from "./PostCard.Tags";

interface PostCardItemProps {
  post: PostSummary;
  handleHidePost: (id: number) => void;
}
export const PostCardItem = ({ post, handleHidePost }: PostCardItemProps) => {
  return (
    <div className="p-4 relative group rounded-2xl border border-primary">
      <PostCard post={post} handleHidePost={handleHidePost}>
        <PostCard.Header />
        <h4>{post.title}</h4>
        <PostCard.Media />
        <PostCardTags />
        <PostCard.Meta />
        <PostCard.Footer />
      </PostCard>
    </div>
  );
};
