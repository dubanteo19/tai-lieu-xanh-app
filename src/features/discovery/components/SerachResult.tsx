import { PostSummary } from "@/features/post/types/post.type";
import ReactLoading from "react-loading";
import { DocumentCard } from "./DocumentCard";

interface SearchResultProps {
  posts: PostSummary[];
  isLoading: boolean;
}
export const SearchResult = ({ posts, isLoading }: SearchResultProps) => {
  if (isLoading) return;
  <ReactLoading type="spin" color="green" width={50} height={50} />;
  return (
    <div>
      {posts.map((post) => (
        <DocumentCard key={post.id} {...post} />
      ))}
    </div>
  );
};
