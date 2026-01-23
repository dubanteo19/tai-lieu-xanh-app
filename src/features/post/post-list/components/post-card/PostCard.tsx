import { PostSummary } from "@/features/post/types/post.type";
import { FC, ReactNode } from "react";
import { PostCardContext } from "./PostCard.context";
interface PostCardProps {
  post: PostSummary;
  handleHidePost?: (id: number) => void;
  children: ReactNode;
}

export type PostCardComponent = FC<PostCardProps> & {
  Header: FC;
  Media: FC;
  Meta: FC;
  Tags: FC;
  Footer: FC;
};

const PostCardBase = ({ children, post, handleHidePost }: PostCardProps) => {
  return (
    <PostCardContext.Provider
      value={{
        post,
        handleHidePost,
      }}
    >
      <div className="p-4 rounded-2xl border border-primary">{children}</div>
    </PostCardContext.Provider>
  );
};
export const PostCard = PostCardBase as PostCardComponent;
