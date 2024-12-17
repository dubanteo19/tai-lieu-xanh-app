import { Avatar, IconButton, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import { users } from "../../data/users";

export const statusColors = {
  active: "green",
  inactive: "gray",
  banned: "red",
  pending: "orange",
};
export const UserTable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user ",
      headerName: "Người dùng",
      width: 180,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            src={params.row.avatar}
            alt={params.row.fullName}
            sx={{ width: 30, height: 30 }}
          />
          <Typography variant="body2">{params.row.fullName}</Typography>
        </Stack>
      ),
    },
    { field: "email", headerName: "Email", width: 220 },
    {
      field: "totalPosts",
      headerName: "Tài liệu",
      type: "number",
      width: 90,
    },
    {
      field: "totalComments",
      headerName: "Bình luận",
      width: 90,
    },
    {
      field: "totalDownloads",
      headerName: "Lượt tải",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 130,
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
          {params.row.status}
        </Typography>
      ),
      width: 110,
    },
    {
      field: "action",
      headerName: "Chức năng",
      width: 90,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton color="success">
            <PreviewIcon />
          </IconButton>
          <IconButton color="warning">
            <DeleteIcon />
          </IconButton>
          <IconButton color="warning">
            <PreviewIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <Paper sx={{ height: 400, width: "100", px: 5, py: 2, mt: 2 }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
    </Paper>
  );
};
