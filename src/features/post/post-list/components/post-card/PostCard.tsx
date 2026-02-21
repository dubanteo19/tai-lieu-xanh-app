import { PostSummary } from "@/features/post/types/post.type";
import { FC, ReactNode } from "react";
import { PostCardContext } from "./PostCard.context";
import { PostCardFooter } from "./PostCard.Footer";
import { PostCardHeader } from "./PostCard.Header";
import { PostCardMedia } from "./PostCard.Media";
import { PostCardMeta } from "./PostCard.Meta";
import { PostCardTags } from "./PostCard.Tags";
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
      <div>{children}</div>
    </PostCardContext.Provider>
  );
};

export const PostCard = PostCardBase as PostCardComponent;

PostCard.Header = PostCardHeader;
PostCard.Media = PostCardMedia;
PostCard.Meta = PostCardMeta;
PostCard.Tags = PostCardTags;
PostCard.Footer = PostCardFooter;
