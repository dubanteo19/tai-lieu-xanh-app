import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import SearchBar from "../../../components/SearchBar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FullLoading from "../../../components/FullLoading";
import DoneIcon from "@mui/icons-material/Done";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import PreviewIcon from "@mui/icons-material/Preview";
import {
  useApprovePostMutation,
  useGetAllReviewPostsQuery,
  useRejectPostMutation,
} from "../../api/adminPostApi";
import { useNavigate } from "react-router-dom";
import { PostPreview } from "../../../components/PostPreview";
import { useState } from "react";
import { useSendNotificationMutation } from "../../../api/notificationApi";
import { useGetAllReasonsQuery } from "../../api/reportApi";
import { getVNReason } from "../../../utils/statusTranslator";
export const CenterCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      sx={{ height: "100%", width: "100%", padding: 0 }}
    >
      {children}
    </Stack>
  );
};
export const ReviewPostsTable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Tiêu đề", width: 280 },
    {
      field: "author ",
      headerName: "Tác giả",
      width: 140,
      renderCell: (params) => (
        <CenterCell>
          <Typography variant="body2">{params.row.author.fullName}</Typography>
        </CenterCell>
      ),
    },
    {
      field: "major",
      headerName: "Ngành",
      width: 140,
      renderCell: (params) => (
        <CenterCell>
          <Typography variant="body2">{params.row.major.majorName}</Typography>
        </CenterCell>
      ),
    },
    {
      field: "tags",
      headerName: "Nhãn",
      width: 200,
      renderCell: (params) => (
        <CenterCell>
          {params.row.tags.map((tag: string) => (
            <Chip key={tag} label={tag} />
          ))}
        </CenterCell>
      ),
    },
    {
      field: "createdDate",
      headerName: "Ngày đăng",
      width: 160,
    },
    {
      field: "action",
      headerName: "Chức năng",
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center">
          <IconButton
            onClick={() => {
              setPreviewPostId(params.row.id);
            }}
            color="success"
          >
            <PreviewIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleApprovePost(params.row.id, params.row.author.id);
            }}
            color="success"
          >
            <DoneIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              handleClickOpen();
              setSelectedPost(params.row.id);
            }}
          >
            <ThumbDownAltIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 10 };
  const handleRejectPost = async (id: number) => {
    try {
      await rejectPost({ postId: id, reason });
    } catch (error) {
      console.log(error);
    }
  };
  const handleApprovePost = async (id: number, userId: number) => {
    try {
      await approvePost({ postId: id });
      await sendNotification({
        userId: userId,
        content: "Bài viết của bạn đã được phê duyệt",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [approvePost] = useApprovePostMutation();
  const [sendNotification] = useSendNotificationMutation();
  const [rejectPost] = useRejectPostMutation();
  const [previewPostId, setPreviewPostId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(0);
  const { data: posts, isLoading } = useGetAllReviewPostsQuery({
    page: paginationModel.page,
    size: paginationModel.pageSize,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const [reason, setReason] = useState<string>("SPAM");
  const { data: reasons } = useGetAllReasonsQuery();
  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <Paper sx={{ height: 400, width: "100", px: 5, py: 2, mt: 2 }}>
      {isLoading && <FullLoading />}
      <DataGrid
        rows={posts}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
      {/* Preview Modal */}
      <Dialog
        open={Boolean(previewPostId)}
        onClose={() => setPreviewPostId(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          {previewPostId && <PostPreview postId={previewPostId} />}
        </DialogContent>
      </Dialog>
      {/* Report Dialog */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle textAlign={"center"}>Từ chối tài liệu</DialogTitle>
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
              handleRejectPost(selectedPost);
            }}
            color="error"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Gửi phản hổi"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
export const ReviewPosts = () => {
  const navigate = useNavigate();
  return (
    <Stack sx={{ px: 4 }}>
      <Typography fontWeight="bold" variant="h5">
        Duyệt tài liệu
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        bgcolor="white"
        sx={{ mt: 2, px: 4, py: 2, borderRadius: 2 }}
        justifyContent="space-between"
      >
        <Stack direction={"row"} spacing={2}>
          <Button
            onClick={() => {
              navigate("/admin/posts");
            }}
            color="warning"
            sx={{ color: "white", fontWeight: "bold" }}
            variant="contained"
          >
            {"<- Quay lại"}
          </Button>
          <SearchBar color="primary.main" />
        </Stack>
      </Stack>
      <ReviewPostsTable />
    </Stack>
  );
};
