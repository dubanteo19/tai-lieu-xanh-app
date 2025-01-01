import {
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import FullLoading from "../../../components/FullLoading";
import {
  useDeletePostMutation,
  useGetAllPostsQuery,
} from "../../api/adminPostApi";
import { CenterCell } from "./ReviewPosts";
import { getVNStatusName } from "../../../utils/statusTranslator";
import { useState } from "react";
import { PostPreview } from "../../../components/PostPreview";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
export const PostTable = () => {
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
    { field: "views", headerName: "Lượt xem", width: 80 },
    {
      field: "downloads",
      headerName: "Lượt tải",
      type: "number",
      width: 90,
    },
    {
      field: "createdDate",
      headerName: "Ngày đăng",
      width: 180,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 120,
      renderCell: (params) => (
        <CenterCell>
          <Typography variant="body2">
            {getVNStatusName(params.row.status)}
          </Typography>
        </CenterCell>
      ),
    },
    {
      field: "action",
      headerName: "Chức năng",
      width: 90,
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
            color="warning"
            onClick={() => {
              handleDeletePost(params.row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 10 };
  const notify = withReactContent(Swal);
  const [deletePost] = useDeletePostMutation();
  const handleDeletePost = async (id: number) => {
    notify
      .fire({
        title: "Bạn có muốn xóa tài liệu này?",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: `Quay lại`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          try {
            deletePost({
              postId: id,
            });
            toast.success("Xóa tài liệu thành công", {
              position: "bottom-right",
              autoClose: 1000,
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
  };
  const [previewPostId, setPreviewPostId] = useState(null);
  const { data: posts, isLoading } = useGetAllPostsQuery({
    page: paginationModel.page,
    size: paginationModel.pageSize,
  });
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
    </Paper>
  );
};
