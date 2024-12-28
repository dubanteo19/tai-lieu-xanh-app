import {
  Avatar,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { statusColors } from "../user/UserTable";
interface Props {
  comments: Comment[];
}
export const CommentTable: React.FC<Props> = ({ comments }) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
    },
    {
      field: "author ",
      headerName: "Tác giả",
      width: 200,
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
    {
      field: "postTitle",
      headerName: "Tai lieu",
      width: 250,
    },
    {
      field: "comment",
      headerName: "Binh luan",
      width: 150,
    },
    {
      field: "parentComment",
      headerName: "Phan hoi binh luan",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Ngay tao",
      width: 85,
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
      field: "actions",
      headerName: "Chức năng",
      width: 100,
      renderCell: () => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];
  return (
    <Paper sx={{ px: 5, py: 2, mt: 2, height: 600 }}>
      <DataGrid rows={comments} columns={columns} />
    </Paper>
  );
};
