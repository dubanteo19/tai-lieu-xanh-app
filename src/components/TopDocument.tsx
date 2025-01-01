import { Box, Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { TitleBar } from "./TitleBar";
import React from "react";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
  useGetHotPostsQuery,
  useGetNewPostsQuery,
  useGetRelatedPostsQuery,
} from "../api/postApi";
import { getThumbUri } from "../utils/uri";
import { IPost } from "../type/IPost";
import { shortText } from "../utils/shortText";
import { Link, useNavigate } from "react-router-dom";

const DocumentItem: React.FC<IPost> = (post) => {
  const navigate = useNavigate();
  return (
    <Stack bgcolor="white" direction="row">
      {post.thumb ? (
        <Box
          sx={{ width: 100, height: 80 }}
          component={"img"}
          src={getThumbUri(post.thumb)}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: 80,
            borderRadius: 1,
            border: "1px solid #ccc",
          }}
          bgcolor="secondary.main"
        >
          <Typography textAlign="center">Tài liệu</Typography>
        </Box>
      )}
      <Box sx={{ ml: 1 }}>
        <Box
          sx={{ minHeight: 20, cursor: "pointer" }}
          onClick={() => {
            navigate(`/post/${post.id}`);
          }}
        >
          <Typography fontSize={18}>{shortText(post.title, 25)}</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <DisplaySettingsIcon sx={{ color: "primary.main" }} />
          <Chip label={post.major.majorName} size="small" />
        </Stack>
        <Stack direction="row" spacing={1}>
          <RemoveRedEyeIcon />
          <Typography>{post.views || 0}</Typography>
          <CloudDownloadIcon />
          <Typography>{post.downloads || 0}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};
export const RecDocumentItem: React.FC<IPost> = (post) => {
  return (
    <Grid
      size={6}
      sx={{
        px: 2,
        py: 1,
        bgcolor: "white",
        border: "1px solid #ccc",
        borderRadius: 1,
      }}
    >
      <Link to={`/post/${post.id}`}>
        <Typography
          color="black"
          sx={{
            wordBreak: "break-all",
            minHeight: 50,
          }}
        >
          {shortText(post.title, 30)}
        </Typography>
      </Link>
      <Stack direction="row" spacing={2}>
        <Stack alignItems="center" spacing={1} direction="row">
          <RemoveRedEyeIcon fontSize="inherit" />
          <Typography fontSize="inherit">{post.views}</Typography>
        </Stack>
        <Stack alignItems="center" spacing={1} direction="row">
          <CloudDownloadIcon fontSize="inherit" />
          <Typography fontSize="inherit">{post.downloads || 0}</Typography>
        </Stack>
      </Stack>
    </Grid>
  );
};

export const NewDocument = () => {
  const { data: newPosts } = useGetNewPostsQuery();
  return (
    <Box>
      <TitleBar text="TÀI LIỆU MỚI" />
      <Grid container spacing={1}>
        {newPosts &&
          newPosts.map((post) => <RecDocumentItem key={post.id} {...post} />)}
      </Grid>
    </Box>
  );
};

export const TopDocument = () => {
  const { data: hotPosts } = useGetHotPostsQuery();
  return (
    <Box>
      <TitleBar text="TÀI LIỆU HOT" />
      <Stack spacing={1}>
        {hotPosts &&
          hotPosts.map((doc) => <DocumentItem key={doc.id} {...doc} />)}
      </Stack>
    </Box>
  );
};

export const RelatedDocument: React.FC<{ postId: number }> = (postId) => {
  const { data: relatedPosts } = useGetRelatedPostsQuery(postId);
  return (
    <Box>
      <TitleBar text="TÀI LIỆU LIÊN QUAN" />
      <Stack spacing={1}>
        {relatedPosts &&
          relatedPosts.map((doc) => <DocumentItem key={doc.id} {...doc} />)}
      </Stack>
    </Box>
  );
};
