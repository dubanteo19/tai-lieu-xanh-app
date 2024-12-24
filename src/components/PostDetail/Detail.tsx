import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { PostInfo } from "./PostInfo";
import { PostBody } from "./PostBody";
import PostComments from "./PostComments";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DownloadIcon from "@mui/icons-material/Download";
import FlagIcon from "@mui/icons-material/Flag";
import { IComment } from "../../type/IComment";
import { comments } from "../../admin/data/comments";
export interface DetailProps {
  id: number;
  title: string;
  author: {
    fullName: string;
    avatar: string;
  };
  date: string;
  major: string;
  tags: string[];
  description: string;
  documents: string[];
  comments: IComment[];
}

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
export const Detail: React.FC<DetailProps> = (post) => {
  return (
    <Box>
      <PostInfo
        fullName={post.author.fullName}
        avatar={post.author.avatar}
        date={post.date}
        title={post.title}
      />
      <PostBody content={post.description} documents={post.documents} />
      <Stack>
        <Typography variant="h5">Nhan:</Typography>
        {post.tags && post.tags.map((tag) => <Chip label={tag} />)}
      </Stack>
      <PostButtons />
      <PostComments comments={comments} />
    </Box>
  );
};
