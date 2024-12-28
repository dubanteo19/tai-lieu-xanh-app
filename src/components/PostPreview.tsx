import React from "react";
import {
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { PostInfo } from "./PostDetail/PostInfo";
import { PostBody } from "./PostDetail/PostBody";
import { useGetPostDetailQuery } from "../api/postApi";
import { Link } from "react-router-dom";

export const PostPreview: React.FC<{ postId: number }> = ({ postId }) => {
  const { data: post, isLoading, isError } = useGetPostDetailQuery(postId);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (isError || !post) {
    return (
      <Typography color="error" textAlign="center">
        Unable to load post details.
      </Typography>
    );
  }
  return (
    <Paper sx={{ px: 2, pb: 5 }}>
      <Box position={"relative"}>
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            top: 40,
            right: 0,
            transform: "rotate(20deg)",
            border: "1px solid green",
            p: 1,
            color: "green",
            cursor: "pointer",
          }}
        >
          {post.major.majorName}
        </Typography>
        <PostInfo
          fullName={post.author.fullName}
          avatar={post.author.avatar}
          date={post.createdDate}
          title={post.title}
        />
      </Box>
      <Divider variant="middle" />
      <PostBody
        isLoading={isLoading}
        mdoc={post.mdoc}
        description={post.description}
        postId={post.id}
      />
      <Stack direction="row" spacing={1} sx={{ my: 2 }}>
        <Typography variant="h5">Nhãn:</Typography>
        {post.tags &&
          post.tags.map((tag) => (
            <Chip key={tag.tagName} label={tag.tagName} />
          ))}
      </Stack>
    </Paper>
  );
};
