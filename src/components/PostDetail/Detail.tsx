import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { PostInfo } from "./PostInfo";
import { PostBody } from "./PostBody";
import PostComments from "./PostComments";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DownloadIcon from "@mui/icons-material/Download";
import FlagIcon from "@mui/icons-material/Flag";
import { useGetCommentsByPostIdQuery } from "../../api/commentApi";
import { IPostDetail } from "../../type/IPostDetail";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../api/url";
import { useDispatch, useSelector } from "react-redux";
import {
  favoriteAdd,
  favoriteRemove,
} from "../../features/favorite/favoriteSlice";
import { RootState } from "../../app/store";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  useGetAllReasonsQuery,
  useReportPostMutation,
} from "../../admin/api/reportApi";
import { getVNReason } from "../../utils/statusTranslator";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const PostButtons: React.FC<{ postId: number }> = ({ postId }) => {
  const dispatch = useDispatch();
  const favorite = useSelector((state: RootState) => state.favorite);
  const isInFavorite = favorite.some((p) => p.postId === postId);
  const [reason, setReason] = useState<string>("SPAM");
  const [openDialog, setOpenDialog] = useState(false);
  const { data: reasons } = useGetAllReasonsQuery();
  const [reportPost, { isLoading, isSuccess, isError }] =
    useReportPostMutation();
  const handleClickOpen = () => {
    if (!isLogin) {
      notify.fire({
        icon: "error",
        title: "Thông báo",
        text: "Vui lòng đăng nhập để báo cáo",
        showConfirmButton: true,
      });
      return;
    }
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const { id: userId, isLogin } = useSelector((state: RootState) => state.auth);
  const notify = withReactContent(Swal);
  const handleReportPost = async (postId: number) => {
    try {
      await reportPost({
        postId,
        userId,
        reason,
      });
      handleClose();
      toast.success("Báo cáo tài liệu thành công", {});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" ml={5} spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Yêu thích</Typography>
          <IconButton
            sx={{
              alignItems: "end",
              "&:focus": {
                outline: "none",
              },
            }}
            onClick={() => {
              !isInFavorite
                ? dispatch(favoriteAdd({ postId }))
                : dispatch(favoriteRemove({ postId }));
              const message = isInFavorite
                ? "Xóa khỏi danh sách yêu thích thành công"
                : "Thêm vào danh sách yêu thích thành công";
              toast.success(message, {
                autoClose: 1000,
                position: "bottom-left",
              });
            }}
          >
            {isInFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </IconButton>
        </Box>

        <Button
          startIcon={<DownloadIcon />}
          href={BASE_URL + `posts/${postId}/download`}
          sx={{
            "&:hover": {
              bgcolor: "white",
            },
          }}
          color="warning"
          variant="contained"
        >
          Tải tải liệu
        </Button>
      </Stack>
      <Button
        startIcon={<FlagIcon />}
        color="error"
        onClick={handleClickOpen}
        variant="contained"
      >
        Báo cáo
      </Button>
      {/* Report Dialog */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle textAlign={"center"}>Báo cáo tài liệu</DialogTitle>
        <DialogContent sx={{ p: 5, width: "400px" }}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="report-reason-label">Chọn lý do</InputLabel>
            <Select
              labelId="report-reason-label"
              value={reason}
              label="Chọn lý do"
              onChange={(e) => setReason(e.target.value)}
            >
              {reasons?.map((reason) => (
                <MenuItem key={reason} value={reason}>
                  {getVNReason(reason)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleReportPost(postId);
            }}
            color="error"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Gửi báo cáo"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
export const Detail: React.FC<IPostDetail> = (post) => {
  const { data, isLoading } = useGetCommentsByPostIdQuery(post.id);
  const navigate = useNavigate();
  return (
    <Paper sx={{ px: 2, pb: 5 }}>
      <Box position={"relative"}>
        <Link to={`/search?major=${post.major.id}`}>
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
        </Link>
        <PostInfo
          id={post.author.id}
          fullName={post.author.fullName}
          avatar={post.author.avatar}
          date={post.createdDate}
          title={post.title}
        />
      </Box>
      <Divider variant="middle" />
      <PostBody
        mdoc={post.mdoc}
        isLoading={isLoading}
        description={post.description}
        postId={post.id}
      />
      <Stack direction="row" spacing={1} sx={{ my: 2 }}>
        <Typography variant="h5">Nhãn:</Typography>
        {post.tags &&
          post.tags.map((tag) => (
            <Chip
              key={tag.tagName}
              onClick={() => {
                navigate(`/search?tags=${tag.tagName}`);
              }}
              label={tag.tagName}
            />
          ))}
      </Stack>
      <PostButtons postId={post.id} />
      {data && <PostComments postId={post.id} comments={data} />}
    </Paper>
  );
};
