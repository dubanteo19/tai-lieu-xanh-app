import {
  Avatar,
  Box,
  Button,
  Chip,
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
import { IPost } from "../type/IPost";
import { useGetAllPostsQuery } from "../api/postApi";
export const Post: React.FC<IPost> = (post) => {
  return (
    <Paper sx={{ my: 1, p: 3 }}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Avatar src={post.author.avatar} />
        <Stack sx={{ flexBasis: "80%", ml: 2 }}>
          <Typography>{post.author.fullName}</Typography>
          <Typography>{post.createdDate}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <MoreHorizIcon />
          <CloseIcon />
        </Stack>
      </Stack>
      <Stack sx={{ position: "relative" }}>
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
        {post.major && (
          <Typography
            key={post.major}
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
      <Stack direction="row" spacing={1} sx={{ pb: 2 }}>
        <Typography fontWeight={"bold"}>Tags:</Typography>
        {post.tags &&
          post.tags.map((tag) => <Chip key={tag} label={tag} size="small" />)}
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
  const { data, isLoading, error } = useGetAllPostsQuery();
  console.log(data);
  return (
    <Stack>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        data?.map((post: IPost) => <Post key={post.id} {...post} />)
      )}
    </Stack>
  );
};
export default PostList;
