import { Avatar, IconButton, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { posts } from "../../../data/posts";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
export const PostTable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Tiêu đề", width: 280 },
    {
      field: "author ",
      headerName: "Tác giả",
      width: 180,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            src={params.row.author.avatar}
            alt={params.row.author.fullName}
            sx={{ width: 30, height: 30 }}
          />
          <Typography variant="body2">{params.row.author.fullName}</Typography>
        </Stack>
      ),
    },
    { field: "views", headerName: "Lượt xem", width: 80 },
    {
      field: "downloads",
      headerName: "Lượt tải",
      type: "number",
      width: 90,
    },
    {
      field: "comments",
      headerName: "Bình luận",
      width: 90,
    },
    {
      field: "createDate",
      headerName: "Ngày đăng",
      width: 120,
    },
    {
      field: "status",
      headerName: "Trang thái",
      width: 90,
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
        rows={posts}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
    </Paper>
  );
};
