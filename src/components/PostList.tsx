import { Button, Stack } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllPublishedPostsQuery } from "../api/postApi";
import { RootState } from "../app/store";
import { IPost } from "../type/IPost";
import FullLoading from "./FullLoading";
import { Post } from "./post/Post";

export const PostList = () => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<IPost[]>([]);
  const favorite = useSelector((state: RootState) => state.favorite);
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
    <Stack>
      {posts?.map((post: IPost) => (
        <Post key={post.id} handleHidePost={handleHidePost} post={post} />
      ))}
      <Button
        onClick={handleShowMore}
        disabled={isLoading}
        variant="contained"
        sx={{
          marginTop: 2,
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        Xem thêm
      </Button>
    </Stack>
  );
};
