import { MajorItem } from "@/features/major/components/MajorItem";
import { PostSummary } from "@/features/post/types/post.type";
import { PostCard } from "./PostCard";
import { PostCardTags } from "./PostCard.Tags";
import { NavLink } from "react-router-dom";

interface PostCardItemProps {
  post: PostSummary;
  handleHidePost: (id: number) => void;
}
export const PostCardItem = ({ post, handleHidePost }: PostCardItemProps) => {
  return (
    <div className="p-4 relative group rounded-2xl border border-primary">
      <PostCard post={post} handleHidePost={handleHidePost}>
        <PostCard.Header />
        <div>{post.title}</div>
        <PostCard.Media />
        <div className=" group-hover:opacity-100 transition-all rotate-30  absolute top-12 right-0  opacity-0">
          <div className="border-primary border-2 text-primary  px-3 py-2 ">
            <NavLink to={`/search?major=${post.major.id}`}>
              {post.major.name}
            </NavLink>
          </div>
        </div>
        <PostCardTags />
        <PostCard.Meta />
        <PostCard.Footer />
      </PostCard>
    </div>
  );
};
