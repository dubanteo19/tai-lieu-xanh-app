import {
  Avatar,
  Button,
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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} from "../../api/adminUserApi";
import { CenterCell } from "../post/ReviewPosts";
import { useNavigate } from "react-router-dom";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useState } from "react";
import { toast } from "react-toastify";
import { getVNStatusName } from "../../../utils/statusTranslator";
export const statusColors = {
  ACTIVE: "green",
  INACTIVE: "gray",
  BANNED: "red",
  PENDING: "orange",
};
export const UserTable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user ",
      headerName: "Người dùng",
      width: 180,
      renderCell: (params) => (
        <CenterCell>
          <Typography variant="body2">{params.row.fullName}</Typography>
        </CenterCell>
      ),
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "posts",
      headerName: "Tài liệu",
      type: "number",
      width: 90,
    },
    {
      field: "comments",
      headerName: "Bình luận",
      width: 90,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      renderCell: (params) => (
        <Typography
          sx={{
            bgcolor: statusColors[params.row.status] || "lightgray", // Default color
            color: "white", // Text color
            borderRadius: "10px",
            textAlign: "center",
            p: "2px 2px",
            fontWeight: "bold",
          }}
        >
          {getVNStatusName(params.row.status)}
        </Typography>
      ),
      width: 110,
    },
    {
      field: "action",
      headerName: "Chức năng",
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            onClick={() => {
              navigate(`/profile/${params.row.id}`);
            }}
            color="success"
          >
            <PreviewIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleClickOpen();
              setSelectedUserId(params.row.id);
            }}
            color="warning"
          >
            <DehazeIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];
  const navigate = useNavigate();
  const paginationModel = { page: 0, pageSize: 5 };
  const { data: users } = useGetAllUserQuery();
  const [openDialog, setOpenDialog] = useState(false);
  const [status, setStatus] = useState("ACTIVE");
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();
  const [seletedUserId, setSelectedUserId] = useState(0);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleUpdateStatus = async () => {
    try {
      await updateStatus({ userId: seletedUserId, status });
      handleClose();
      toast.success("Cập nhật trạng thái thành công", {});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper sx={{ height: 400, px: 15, py: 2, mt: 2 }}>
      {users && (
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
        />
      )}
      {/* Report Dialog */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle textAlign={"center"}>Cập nhập trạng thái</DialogTitle>
        <DialogContent sx={{ p: 5, width: "400px" }}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="repor -decision-label">Chọn trạng thái</InputLabel>
            <Select
              labelId="report-decision-label"
              value={status}
              label="Chọn trạng thái"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem key={"ACTIVE"} value={"ACTIVE"}>
                Hoạt động
              </MenuItem>
              <MenuItem key={"BAN"} value={"BAN"}>
                Đình chỉ
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
              handleUpdateStatus();
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
