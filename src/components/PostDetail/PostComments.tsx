import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { IComment } from "../../type/IComment";

interface PostCommentsProps {
  comments: IComment[];
}
const PostComments: React.FC<PostCommentsProps> = ({ comments }) => {
  return (
    <Paper sx={{ my: 2, p: 3 }}>
      <Typography fontWeight="bold" variant="h5">
        Bình luận(3)
      </Typography>
      <CommentBox></CommentBox>
      <Stack spacing={2} sx={{ py: 3 }}>
        {comments.map((comment) => (
          <Comment {...comment} />
        ))}
      </Stack>
    </Paper>
  );
};
const CommentBox = () => {
  return (
    <Box>
      <TextareaAutosize minRows={5} cols={65}></TextareaAutosize>
      <Button sx={{ color: "white", float: "right" }} variant="contained">
        Gửi bình luận
      </Button>
    </Box>
  );
};

const Comment: React.FC<IComment> = (comment) => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar src={comment.author.avatarUrl} />
      <Stack>
        <Typography fontWeight="bold">{comment.author.fullName}</Typography>
        <Typography>{comment.comment}</Typography>
        <Stack alignItems="center" direction="row">
          <Button>Phản hồi</Button>
          <Typography>{comment.createdAt}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default PostComments;
