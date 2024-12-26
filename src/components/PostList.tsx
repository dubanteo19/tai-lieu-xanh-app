import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import { IPost } from "../type/IPost";
import { useGetAllPostsQuery } from "../api/postApi";
import { Link, useNavigate } from "react-router-dom";
const NoThumb = () => {
  return (
    <div
      style={{
        width: "600px",
        height: "400px",
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#888",
        fontSize: "14px",
        textAlign: "center",
      }}
    >
      Không có hình xem trước
    </div>
  );
};
export const Post: React.FC<IPost> = (post) => {
  const navigate = useNavigate();
  const encodeUrl = encodeURIComponent("/" + post.thumb);
  const thumb = `http://localhost:8080/api/v1/documents/download-thumb?uri=${encodeUrl}`;
  return (
    <Paper sx={{ my: 1, p: 3 }}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Avatar src={post.author.avatar} />
        <Stack sx={{ flexBasis: "80%", ml: 2 }}>
          <Typography>{post.author.fullName}</Typography>
          <Typography>{post.createdDate}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <CloseIcon />
        </Stack>
      </Stack>
      <Stack sx={{ position: "relative" }}>
        <Typography variant="h5">
          <Link
            to={`post/${post.id}`}
            style={{
              color: "black",
            }}
          >
            {post.title}
          </Link>
        </Typography>
        {post.major && (
          <Typography
            sx={{
              py: 1,
              width: "fit-content",
              borderRadius: 2,
              position: "absolute",
              top: 25,
              my: 2,
              px: 2,
              bgcolor: "primary.main",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {post.major}
          </Typography>
        )}
        {post.thumb ? (
          <Box component="img" width={600} height={400} src={thumb}></Box>
        ) : (
          <NoThumb />
        )}
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <VisibilityIcon />
          {post.views}
        </Box>
        <Stack direction="row" spacing={2}>
          <Typography>{post.comments} bình luận</Typography>
          <Typography>{post.downloads | 0} lượt tải</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ pb: 2 }}>
        <Typography fontWeight={"bold"}>Tags:</Typography>
        {post.tags &&
          post.tags.map((tag) => <Chip key={tag} label={tag} size="small" />)}
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate(`post/${post.id}`);
          }}
          startIcon={<VisibilityIcon />}
        >
          Xem chi tiết
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            navigate(`post/${post.id}`);
          }}
          startIcon={<CommentIcon />}
        >
          Bình luận
        </Button>
      </Stack>
    </Paper>
  );
};
const PostList = () => {
  const [page, setPage] = useState(0); // Tracks current page
  const [posts, setPosts] = useState<IPost[]>([]); // Tracks all loaded posts

  const { data, isLoading, isSuccess } = useGetAllPostsQuery({ page, size: 6 });
  useEffect(() => {
    if (isSuccess && data) {
      setPosts((prevPosts) => [...prevPosts, ...data]);
    }
  }, [data, isSuccess]);
  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Stack>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        posts?.map((post: IPost) => <Post key={post.id} {...post} />)
      )}
      <Button
        onClick={handleShowMore}
        disabled={isLoading}
        color="info"
        variant="contained"
        sx={{ marginTop: 2 }}
      >
        Xem thêm
      </Button>
    </Stack>
  );
};
export default PostList;
