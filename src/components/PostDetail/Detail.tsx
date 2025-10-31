import { useLazyGetDocumentPresignedUrlQuery } from "@/api/mDocApi";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FlagIcon from "@mui/icons-material/Flag";
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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  useGetAllReasonsQuery,
  useReportPostMutation,
} from "../../admin/api/reportApi";
import { useGetCommentsByPostIdQuery } from "../../api/commentApi";
import { RootState } from "../../app/store";
import { IPostDetail } from "../../type/IPostDetail";
import { getVNReason } from "../../utils/statusTranslator";
import { PostBody } from "./PostBody";
import PostComments from "./PostComments";
import { PostInfo } from "./PostInfo";

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
  const [triggerGetPresignedUrl, { data: presignedUrl, isFetching }] =
    useLazyGetDocumentPresignedUrlQuery();
  const [openDownloadPopup, setOpenDownloadPopup] = useState<boolean>(false);
  const handleOpenDownloadPopup = () => {
    setOpenDownloadPopup(true);
    triggerGetPresignedUrl(postId);
  };
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" ml={5} spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Yêu thích</Typography>
          <IconButton>
            {isInFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </IconButton>
        </Box>
        <Button
          startIcon={<DownloadIcon />}
          onClick={handleOpenDownloadPopup}
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
      {/* Download popup */}
      <Dialog open={openDownloadPopup} onClose={setOpenDownloadPopup}>
        <DialogTitle textAlign={"center"}>Download document</DialogTitle>
        <DialogContent sx={{ p: 5, width: "400px" }}>
          <h2></h2>
          {isFetching ? (
            <CircularProgress />
          ) : (
            <h2>
              Thank you for download please click the button below to download
            </h2>
          )}
        </DialogContent>
        <DialogActions>
          {presignedUrl && (
            <Button variant="contained" color="primary">
              <a href={presignedUrl.url}>Download</a>
            </Button>
          )}
        </DialogActions>
      </Dialog>
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
