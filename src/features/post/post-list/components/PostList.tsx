import FullLoading from "@/shared/components/full-loading";
import { Button } from "@/shared/ui/button";
import { useEffect, useState } from "react";
import { PostSummary } from "../../types/post.type";
import { PostCardItem } from "./post-card/PostCardItem";
import { useGetAllPublishedPostsQuery } from "../api/post.api";
import { EmptyList } from "@/shared/components/empty-list";

export const PostList = () => {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const { data, isLoading, isSuccess } = useGetAllPublishedPostsQuery({
    nextCursor,
  });
  useEffect(() => {
    if (isSuccess && data) {
      setPosts((prevPosts) => [...prevPosts, ...data.items]);
    }
  }, [data, isSuccess]);
  const handleShowMore = () => {};
  const handleHidePost = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };
  if (isLoading) return <FullLoading />;
  if (!posts.length) return <EmptyList>Không có tài liệu nào</EmptyList>;
  console.log(posts);
  return (
    <div className="flex gap-4 flex-col">
      {posts.map((post) => (
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
