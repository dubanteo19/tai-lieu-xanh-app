import { MajorItem } from "@/features/major/components/MajorItem";
import { PostSummary } from "@/features/post/types/post.type";
import { PostCard } from "./PostCard";
import { PostCardTags } from "./PostCard.Tags";

interface PostCardItemProps {
  post: PostSummary;
  handleHidePost: (id: number) => void;
}
export const PostCardItem = ({ post, handleHidePost }: PostCardItemProps) => {
  return (
    <div className="p-4  rounded-2xl border border-primary">
      <PostCard post={post} handleHidePost={handleHidePost}>
        <PostCard.Header />
        <div>{post.title}</div>
        <PostCard.Media />
        <div className=" group-hover:opacity-100 transition-all  absolute top-5 right-0  opacity-0">
          {post.major && <MajorItem {...post.major} />}
        </div>
        <PostCardTags />
        <PostCard.Meta />
        <PostCard.Footer />
      </PostCard>
    </div>
  );
};
