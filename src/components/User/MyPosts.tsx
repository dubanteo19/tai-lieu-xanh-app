import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Stack,
  InputBase,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import { IPost } from "../../type/IPost";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FullLoading from "../FullLoading";
import { useGetUserPostsQuery } from "../../api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getVNStatusName } from "../../utils/statusTranslator";
import { useDeletePostMutation } from "../../api/userApi";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { CenterCell } from "../../admin/components/post/ReviewPosts";
import { PostPreview } from "../PostPreview";
const SeachBar = () => {
  return (
    <Box
      sx={{
        marginX: 2,
        border: "1px solid rgba(0,0,0,0.3)",
        borderRadius: 2,
        height: 40,
        paddingX: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchIcon sx={{ mr: 2, color: "gray" }} onClick={() => {}} />
      <InputBase
        sx={{
          width: 250,
          color: "gray",
          "input::placeholder": {
            color: "gray",
            opacity: 1,
          },
        }}
        placeholder="Bạn cần tìm gì?"
      />
    </Box>
  );
};
const MyPosts: React.FC = () => {
  const { id } = useSelector((state: RootState) => state.auth);
  const {
    data: posts,
    isLoading,
    refetch,
    isFetching,
  } = useGetUserPostsQuery(id);
  const navigate = useNavigate();
  return (
    <Paper sx={{ minHeight: 320, px: 2 }}>
      {isLoading && <FullLoading />}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          position: "relative",
          marginBottom: "20px",
        }}
      >
        Quản lý tài liệu
      </Typography>
      <Stack direction="row" spacing={4} sx={{ px: 5 }}>
        <Button
          onClick={() => navigate("new-doc")}
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Tạo tài liệu mới
        </Button>
        <SeachBar />
      </Stack>
      <Box sx={{ py: 5 }}>
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 5 }}
        >
          <Typography variant="h5">Tất cả ({posts?.length})</Typography>
          <Button
            variant="contained"
            sx={{ color: "white", fontWeight: "bold" }}
            onClick={refetch}
            disabled={isFetching} // Disable button while fetching
            style={{ marginBottom: "1rem" }}
          >
            {isFetching ? "Đang làm mới dữ liệu..." : "Làm mới"}
          </Button>
        </Stack>
        {posts && <PostTable posts={posts} />}
      </Box>
    </Paper>
  );
};

interface PostTableProps {
  posts: IPost[];
}
const PostTable: React.FC<PostTableProps> = ({ posts }) => {
  const [deletePost] = useDeletePostMutation();
  const { id } = useSelector((state: RootState) => state.auth);
  const handleDeletePost = async (postId: number) => {
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
            deletePost({ postId, userId: id });
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
  const notify = withReactContent(Swal);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "title",
      headerName: "Tiêu đề",
      width: 230,
      renderCell: (params) => (
        <CenterCell>
          <Link to={`/post/${params.row.id}`} style={{ color: "black" }}>
            {params.row.title}
          </Link>
        </CenterCell>
      ),
    },
    {
      field: "major",
      headerName: "Ngành",
      width: 160,
      renderCell: (params) => (
        <CenterCell>
          <Typography textAlign={"center"}>
            {params.row.major.majorName}
          </Typography>
        </CenterCell>
      ),
    },
    { field: "views", headerName: "Lượt xem", width: 80 },
    {
      field: "downloads",
      headerName: "Lượt tải",
      type: "number",
      width: 90,
      renderCell: (params) => (
        <CenterCell>
          <Typography textAlign={"center"}>
            {params.row.downloads || 0}
          </Typography>
        </CenterCell>
      ),
    },
    {
      field: "createdDate",
      headerName: "Ngày đăng",
      width: 120,
      renderCell: (params) => (
        <CenterCell>
          <Typography textAlign={"center"}>
            {params.row.createdDate.replace("tháng", "/").substring(0, 8)}
          </Typography>
        </CenterCell>
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 120,
      renderCell: (params) => (
        <CenterCell>
          <Typography textAlign={"center"}>
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
  const [previewPostId, setPreviewPostId] = useState(null);
  return (
    <Paper sx={{ height: 400, width: 1000, px: 2, py: 2, mt: 2 }}>
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
export default MyPosts;
