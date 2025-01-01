import {
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { statusColors } from "../user/UserTable";
import { ICommentRes } from "../../../type/ICommentRes";
import { CenterCell } from "../post/ReviewPosts";
import { getVNStatusName } from "../../../utils/statusTranslator";
import {
  useDeleteCommentMutation,
} from "../../api/adminCommentApi";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
interface Props {
  comments: ICommentRes[];
}
export const CommentTable: React.FC<Props> = ({ comments }) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
    },
    {
      field: "author",
      headerName: "Tác giả",
      width: 200,
      renderCell: (params) => (
        <CenterCell>
          <Typography variant="body2">{params.row.author.fullName}</Typography>
        </CenterCell>
      ),
    },
    {
      field: "content",
      headerName: "Bình luận",
      width: 250,
    },
    {
      field: "createdDate",
      headerName: "Ngày bình luận",
      width: 205,
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
      field: "actions",
      headerName: "Chức năng",
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleDeleteComment(params.row.id);
          }}
          size="small"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  const handleDeleteComment = async (commentId: number) => {
    try {
      notify
        .fire({
          title: "Bạn có muốn xóa bình luận này?",
          showCancelButton: true,
          confirmButtonText: "Xóa",
          cancelButtonText: `Quay lại`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            try {
              deleteComment({ commentId });
              toast.success("Xóa bình luận thành công", {
                position: "bottom-right",
                autoClose: 1000,
              });
            } catch (error) {
              console.log(error);
            }
          }
        });
      await deleteComment({ commentId });
    } catch (error) {
      console.log(error);
    }
  };

  const notify = withReactContent(Swal);
  const [deleteComment] = useDeleteCommentMutation();
  return (
    <Paper sx={{ px: 15, py: 2, mt: 2, height: 600 }}>
      <DataGrid rows={comments} columns={columns} />
    </Paper>
  );
};
