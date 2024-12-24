import {
  Avatar,
  Button,
  IconButton,
  Paper,
  Popover,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { ICommentRes } from "../../type/ICommentRes";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "../../api/commentApi";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import FullLoading from "../FullLoading";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import React from "react";
import { toast } from "react-toastify";

interface PostCommentsProps {
  comments: ICommentRes[];
}
const PostComments: React.FC<PostCommentsProps> = ({ comments }) => {
  return (
    <Paper
      sx={{
        my: 2,
        p: 3,
      }}
    >
      <Typography fontWeight="bold" variant="h5">
        Bình luận({comments.length})
      </Typography>
      <CommentBox postId={2}></CommentBox>
      <Stack spacing={2} sx={{ py: 3 }}>
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </Stack>
    </Paper>
  );
};
interface CommentBoxProps {
  postId: number;
}
const CommentBox: React.FC<CommentBoxProps> = ({ postId }) => {
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const { id, isLogin } = useSelector((state: RootState) => state.auth);
  const [content, setContent] = useState("");
  const notify = withReactContent(Swal);
  const handleSaveComment = async () => {
    if (!isLogin) {
      notify.fire({
        icon: "error",
        title: "Thông báo",
        text: "Vui lòng đăng nhập để bình luận",
        showConfirmButton: true,
      });
      return;
    }
    try {
      const form = {
        postId: 1,
        content,
        userId: id,
      };
      await createComment(form);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack>
      {isLoading && <FullLoading />}
      <TextareaAutosize
        value={content}
        minRows={5}
        onChange={(event) => setContent(event.target.value)}
        cols={65}
      ></TextareaAutosize>
      <Button
        sx={{ color: "white", width: 200, mt: 1, mx: "auto" }}
        onClick={() => handleSaveComment()}
        variant="contained"
      >
        Gửi bình luận
      </Button>
    </Stack>
  );
};

const Comment: React.FC<ICommentRes> = (comment) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { id } = useSelector((state: RootState) => state.auth);
  const { postId } = useSelector((state: RootState) => state.comment);
  const notify = withReactContent(Swal);
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const handleDelete = async () => {
    setAnchorEl(null);
    notify
      .fire({
        title: "Bạn có muốn xóa vĩnh viễn bình luận này?",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: `Quay lại`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          try {
            deleteComment({
              commentId: comment.id,
              postId: postId,
              userId: id,
            });
            toast.success("Xóa bình luận thành công", {
              position: "bottom-right",
              autoClose: 1000,
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
  };
  const isMine = comment.author.id === id;
  const open = Boolean(anchorEl);
  return (
    <Grid container>
      {isLoading && <FullLoading />}
      <Grid size={1}>
        <Avatar src={comment.author.avatarUrl} />
      </Grid>
      <Grid size={10}>
        <Stack>
          <Stack sx={{ p: 1, borderRadius: 5, bgcolor: "rgba(0, 0, 0, 0.05)" }}>
            <Typography fontWeight="bold">{comment.author.fullName}</Typography>
            <Typography>{comment.content}</Typography>
          </Stack>
          <Typography variant="subtitle1" color="text.secondary">
            {comment.createdDate}
          </Typography>
        </Stack>
      </Grid>
      {isMine && (
        <Stack>
          <IconButton onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            onClose={handleClose}
          >
            <Stack>
              <IconButton color="info">
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} color="error">
                <CloseIcon />
              </IconButton>
            </Stack>
          </Popover>
        </Stack>
      )}
    </Grid>
  );
};
export default PostComments;
