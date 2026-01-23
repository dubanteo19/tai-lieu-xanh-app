import { PostSummary } from "@/features/post/types/post.type";
import { createContext, useContext } from "react";

interface PostCardContextValue {
  post: PostSummary;
  handleHidePost?: (id: number) => void;
}
export const PostCardContext = createContext<PostCardContextValue | null>(null);
export const usePostCard = () => {
  const ctx = useContext(PostCardContext);
  if (!ctx) {
    throw new Error("PostCard components must be used inside PostCard");
  }
  return ctx;
};
