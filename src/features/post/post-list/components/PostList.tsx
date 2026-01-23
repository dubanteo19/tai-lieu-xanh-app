import FullLoading from "@/shared/components/FullLoading";
import { Button } from "@/shared/ui/button";
import { useEffect, useState } from "react";
import { PostSummary } from "../../types/post.type";
import { PostCardItem } from "./post-card/PostCardItem";
import { useGetAllPublishedPostsQuery } from "../api/post.api";

export const PostList = () => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const { data, isLoading, isSuccess } = useGetAllPublishedPostsQuery({
    page,
    size: 4,
  });
  useEffect(() => {
    if (isSuccess && data) {
      setPosts((prevPosts) => [...prevPosts, ...data]);
    }
  }, [data, isSuccess]);
  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleHidePost = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };
  if (isLoading) return <FullLoading />;

  return (
    <div className="flex gap-4 flex-col">
      {posts.length &&
        posts.map((post) => (
          <PostCardItem
            key={post.id}
            handleHidePost={handleHidePost}
            post={post}
          />
        ))}
      <Button onClick={handleShowMore} disabled={isLoading}>
        Xem thêm
      </Button>
    </div>
  );
};
