import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { PostInfo } from "./PostInfo";
import { PostBody } from "./PostBody";
import PostComments from "./PostComments";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DownloadIcon from "@mui/icons-material/Download";
import FlagIcon from "@mui/icons-material/Flag";
import { IComment } from "../../type/IComment";
import { useGetCommentsByPostIdQuery } from "../../api/commentApi";
import { IPostDetail } from "../../type/IPostDetail";

const PostButtons = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" spacing={2}>
        <Button
          startIcon={<ThumbUpAltIcon />}
          color="success"
          variant="contained"
        >
          Yêu thích
        </Button>
        <Button
          startIcon={<DownloadIcon />}
          color="warning"
          variant="contained"
        >
          Tải tải liệu
        </Button>
      </Stack>
      <Button startIcon={<FlagIcon />} color="error" variant="contained">
        Báo cáo
      </Button>
    </Stack>
  );
};
export const Detail: React.FC<IPostDetail> = (post) => {
  const { data } = useGetCommentsByPostIdQuery(1);
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
        mdoc={post.mdoc}
        description={post.description}
        postId={post.id}
      />
      <Stack direction="row" spacing={1} sx={{ my: 2 }}>
        <Typography variant="h5">Nhan:</Typography>
        {post.tags &&
          post.tags.map((tag) => (
            <Chip key={tag.tagName} label={tag.tagName} />
          ))}
      </Stack>

      <PostButtons />
      {data && <PostComments comments={data} />}
    </Paper>
  );
};
