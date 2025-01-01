import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SearchBar from "../../../components/SearchBar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FullLoading from "../../../components/FullLoading";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PreviewIcon from "@mui/icons-material/Preview";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import { CenterCell } from "./ReviewPosts";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useState } from "react";
import { PostPreview } from "../../../components/PostPreview";
import { useNavigate } from "react-router-dom";
import {
  useApprovePostMutation,
  useDeepDeletePostMutation,
  useGetAllDeletedPostsQuery,
} from "../../api/adminPostApi";
export const DeletedPostsTable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Tiêu đề", width: 280 },
    {
      field: "author ",
      headerName: "Tác giả",
      width: 150,
      renderCell: (params) => (
        <CenterCell>
          <Typography variant="body2">{params.row.author.fullName}</Typography>
        </CenterCell>
      ),
    },
    {
      field: "major",
      headerName: "Ngành",
      width: 180,
      renderCell: (params) => (
        <CenterCell>
          <Typography variant="body2">{params.row.major.majorName}</Typography>
        </CenterCell>
      ),
    },
    { field: "views", headerName: "Lượt xem", width: 80 },
    {
      field: "createdDate",
      headerName: "Ngày đăng",
      width: 180,
    },
    {
      field: "action",
      headerName: "Chức năng",
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center">
          <IconButton
            color="success"
            onClick={() => {
              setPreviewPostId(params.row.id);
            }}
          >
            <PreviewIcon />
          </IconButton>
          <IconButton
            color="warning"
            onClick={() => {
              handleRecoverPost(params.row.id);
            }}
          >
            <AutoModeIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              handleDeepDeletePost(params.row.id);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 10 };
  const notify = withReactContent(Swal);
  const [previewPostId, setPreviewPostId] = useState(null);
  const handleRecoverPost = async (id: number) => {
    notify
      .fire({
        title: "Bạn có muốn khôi phục tài liệu này?",
        showCancelButton: true,
        confirmButtonText: "Khôi phục",
        cancelButtonText: `Quay lại`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          try {
            recoverPost({
              postId: id,
            });
            toast.success("Khôi phuc tài liệu thành công", {
              position: "bottom-right",
              autoClose: 1000,
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
  };
  const handleDeepDeletePost = async (id: number) => {
    notify
      .fire({
        title: "Bạn có muốn xóa vĩnh viễn tài liệu này?",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: `Quay lại`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          try {
            deepDeletePost({
              postId: id,
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
  const [deepDeletePost] = useDeepDeletePostMutation();
  const [recoverPost] = useApprovePostMutation();
  const { data: posts, isLoading } = useGetAllDeletedPostsQuery({
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
export const DeletedPosts = () => {
  const navigate = useNavigate();
  return (
    <Stack sx={{ px: 4 }}>
      <Typography fontWeight="bold" variant="h5">
        Quản lý tài liệu bị xóa
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
      <DeletedPostsTable />
    </Stack>
  );
};
