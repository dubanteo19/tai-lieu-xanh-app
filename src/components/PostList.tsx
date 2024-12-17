import {
  Avatar,
  Box,
  Button,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import DownloadIcon from "@mui/icons-material/Download";
import { posts } from "../data/posts";
export interface PostProps {
  post: {
    id: number;
    author: {
      avatar: string;
      fullName: string;
    };
    date: string;
    title: string;
    thumb: string;
    views: number;
    comments: number;
    downloads: number;
  };
}
export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Paper sx={{ my: 1, p: 3 }}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Avatar src={post.author.avatar} />
        <Stack sx={{ flexBasis: "80%", ml: 2 }}>
          <Typography>{post.author.fullName}</Typography>
          <Typography>{post.date}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <MoreHorizIcon />
          <CloseIcon />
        </Stack>
      </Stack>
      <Stack>
        <Typography variant="h4">
          <Link
            sx={{
              "&:hover": {
                color: "primary.main",
              },
            }}
            href="/post/1"
            underline="none"
            color="black"
          >
            {post.title}
          </Link>
        </Typography>
        <Box sx={{ maxHeight: 300 }} component="img" src={post.thumb} />
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
          <Typography>{post.downloads} lượt tải</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" startIcon={<VisibilityIcon />}>
          Xem chi tiết
        </Button>
        <Button variant="outlined" startIcon={<CommentIcon />}>
          Bình luận
        </Button>
        <Button
          variant="contained"
          sx={{ color: "white" }}
          startIcon={<DownloadIcon />}
        >
          Tải xuống
        </Button>
      </Stack>
    </Paper>
  );
};
const PostList = () => {
  return (
    <Stack>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Stack>
  );
};
export default PostList;
