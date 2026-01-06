import { useEffect, useState } from "react";
import { useGetAllPublishedPostsQuery } from "../api/postApi";
import { IPost } from "../type/IPost";
import FullLoading from "./FullLoading";
import { Post } from "./post/Post";
import { Button } from "./ui/button";

export const PostList = () => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<IPost[]>([]);
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
      {posts?.map((post: IPost) => (
        <Post key={post.id} handleHidePost={handleHidePost} post={post} />
      ))}
      <Button onClick={handleShowMore} disabled={isLoading}>
        Xem thêm
      </Button>
    </div>
  );
};
