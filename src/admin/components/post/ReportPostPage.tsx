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
import DehazeIcon from "@mui/icons-material/Dehaze";
import PreviewIcon from "@mui/icons-material/Preview";
import { useNavigate } from "react-router-dom";
import { PostPreview } from "../../../components/PostPreview";
import { useState } from "react";
import { useSendNotificationMutation } from "../../../api/notificationApi";
import {
  useGetAllReportPostQuery,
  useUpdateReportMutation,
} from "../../api/reportApi";
import { getVNReason } from "../../../utils/statusTranslator";
import { useBanPostMutation } from "../../api/adminPostApi";
const ReportPostsTable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "postTitle", headerName: "Tiêu đề", width: 280 },
    {
      field: "reason",
      headerName: "Lý do",
      width: 160,
      renderCell: (params) => (
        <Chip label={getVNReason(params.row.reason)} color="info" />
      ),
    },
    {
      field: "fullName",
      headerName: "Người báo cáo",
      width: 160,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 160,
    },
    {
      field: "createdDate",
      headerName: "Ngày báo cáo",
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
              setPreviewPostId(params.row.postId);
            }}
            color="success"
          >
            <PreviewIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              setSelectedReportId(params.row.id);
              setSelectedReportOwner(params.row.userId);
              setSelectedPostId(params.row.postId);
              setSelectedPostAuthor(params.row.authorId);
              handleClickOpen();
            }}
          >
            <DehazeIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 10 };
  const [sendNotification] = useSendNotificationMutation();
  const [previewPostId, setPreviewPostId] = useState(null);
  const [selectedPostAuthor, setSelectedPostAuthor] = useState(0);
  const [selectedReportId, setSelectedReportId] = useState(0);
  const [selectedReportOwner, setSelectedReportOwner] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectStatus, setSelectedStatus] = useState("PENDING");
  const { data: reports, isLoading } = useGetAllReportPostQuery({
    page: paginationModel.page,
    size: paginationModel.pageSize,
    status: selectStatus,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const [decision, setDecision] = useState<string>("IGNORE");
  const [updateReport, { isLoading: isUpdating }] = useUpdateReportMutation();
  const [banPost] = useBanPostMutation();
  const handleDecideReport = async () => {
    try {
      if (decision === "BAN") {
        await updateReport({
          reportId: selectedReportId,
          status: "APPROVED",
        });
        await banPost({ postId: selectedPostId });
        await sendNotification({
          userId: selectedPostAuthor,
          content: `Tài liệu (${selectedPostId}) đã được báo cáo và nhận thấy dấu hiệu vi phạm, 
quản trị viên đã quyết định đình chỉ tài liệu này`,
        });
        await sendNotification({
          userId: selectedReportOwner,
          content: `Báo cáo tài liệu (${selectedReportId}) đã được xem xét và nhận thấy dấu hiệu vi phạm, 
quản trị viên đã quyết định đình chỉ tài liệu này`,
        });
      }
      if (decision === "IGNORE") {
        await updateReport({
          reportId: selectedReportId,
          status: "REJECTED",
        });
        await sendNotification({
          userId: selectedReportOwner,
          content: `Báo cáo tài liệu (${selectedReportId}) đã được xem xét và không nhận thấy dấu hiệu vi phạm`,
        });
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <Paper sx={{ height: 400, width: "100", px: 5, py: 2, mt: 2 }}>
      <Select
        labelId="report-decision-label"
        value={selectStatus}
        label="Chọn lý do"
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <MenuItem key={"PENDING"} value={"PENDING"}>
          Chưa xử lý
        </MenuItem>
        <MenuItem key={"APPROVED"} value={"APPROVED"}>
          Đã xử lý - Đình chỉ
        </MenuItem>
        <MenuItem key={"REJECTED"} value={"REJECTED"}>
          Đã xử lý - Không vi phạm
        </MenuItem>
      </Select>
      {isLoading && <FullLoading />}
      <DataGrid
        rows={reports}
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
        <DialogTitle textAlign={"center"}>Xem xét báo cáo</DialogTitle>
        <DialogContent sx={{ p: 5, width: "400px" }}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="report-decision-label">Chọn quyết định</InputLabel>
            <Select
              labelId="report-decision-label"
              value={decision}
              label="Chọn lý do"
              onChange={(e) => setDecision(e.target.value)}
            >
              <MenuItem key={"IGNORE"} value={"IGNORE"}>
                Bài viết không vi phạm
              </MenuItem>
              <MenuItem key={"BAN"} value={"BAN"}>
                Đình chỉ bài viết
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleDecideReport();
            }}
            color="error"
            variant="contained"
            disabled={isUpdating}
          >
            {isUpdating ? (
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

export const ReportPostPage = () => {
  const navigate = useNavigate();
  return (
    <Stack sx={{ px: 4 }}>
      <Typography fontWeight="bold" variant="h5">
        Tài liệu bị báo cáo
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
      <ReportPostsTable />
    </Stack>
  );
};
