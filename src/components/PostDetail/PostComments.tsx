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
  useUpdateCommentMutation,
} from "../../api/commentApi";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import FullLoading from "../FullLoading";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import React from "react";
import { toast } from "react-toastify";
import { setCommentForm } from "../../features/comment/commentSlice";

interface PostCommentsProps {
  comments: ICommentRes[];
  postId: number;
}
const PostComments: React.FC<PostCommentsProps> = ({ comments }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.auth);
  dispatch(setCommentForm({ userId: id }));
  return (
    <Paper
      id="post-comments"
      sx={{
        my: 2,
        p: 3,
      }}
    >
      <Typography fontWeight="bold" variant="h5">
        Bình luận({comments.length})
      </Typography>
      <CommentBox />
      <Stack spacing={2} sx={{ py: 3 }}>
        {comments.length === 0 ? (
          <Typography variant="body1" textAlign={"center"}>
            Chưa có bình luận
          </Typography>
        ) : (
          comments.map((comment) => <Comment key={comment.id} {...comment} />)
        )}
      </Stack>
    </Paper>
  );
};
const CommentBox: React.FC = () => {
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const commentForm = useSelector((state: RootState) => state.comment);
  const dispatch = useDispatch();
  const { isLogin, id } = useSelector((state: RootState) => state.auth);
  const { content, action } = useSelector((state: RootState) => state.comment);
  const notify = withReactContent(Swal);
  const handleSaveComment = async (e) => {
    e.preventDefault();
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
      if (action === "create") {
        await createComment({
          content: commentForm.content,
          postId: commentForm.postId,
          userId: commentForm.userId,
        });
        dispatch(setCommentForm({ content: "", action: "create" }));
        toast.success("Bình luận thành công", {});
      } else {
        await updateComment({
          content: commentForm.content,
          postId: commentForm.postId,
          userId: commentForm.userId,
          commentId: commentForm.commentId,
        });
        toast.success("Cập nhật bình luận thành công", {});
        dispatch(setCommentForm({ content: "", action: "create" }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack component="form" onSubmit={handleSaveComment} spacing={2}>
      {isLoading && <FullLoading />}
      <TextareaAutosize
        value={content}
        required
        minRows={5}
        onChange={(event) =>
          dispatch(setCommentForm({ content: event.target.value }))
        }
        cols={65}
      ></TextareaAutosize>
      <Button
        type="submit"
        sx={{ color: "white", width: 200, mt: 1, mx: "auto" }}
        variant="contained"
      >
        Lưu bình luận
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
  const dispatch = useDispatch();
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
  const handleUpdate = () => {
    dispatch(
      setCommentForm({
        postId: postId,
        userId: id,
        commentId: comment.id,
        content: comment.content,
        action: "update",
      }),
    );
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
            {comment.status === "DELETED" ? (
              <Typography color="error">Bình luận đã bị xóa</Typography>
            ) : (
              <Typography>{comment.content}</Typography>
            )}
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
              <IconButton onClick={handleUpdate} color="info">
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
