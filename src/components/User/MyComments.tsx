import {
  Box,
  Typography,
  Paper,
  Stack,
  InputBase,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import FullLoading from "../FullLoading";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ICommentRes } from "../../type/ICommentRes";
import { useGetCommentsByUserIdQuery } from "../../api/commentApi";
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
const MyComments: React.FC = () => {
  const { id } = useSelector((state: RootState) => state.auth);
  const { data: comments, isLoading } = useGetCommentsByUserIdQuery(id);
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
        Quản lý bình luận
      </Typography>
      <Stack direction="row" spacing={4} sx={{ px: 5 }}>
        <SeachBar />
      </Stack>
      <Box sx={{ py: 5 }}>
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems="center"
          sx={{ px: 5 }}
        >
          <Typography variant="h5">Tất cả ({comments?.length})</Typography>
        </Stack>
        {comments && <CommentTable comments={comments} />}
      </Box>
    </Paper>
  );
};

interface CommentTableProps {
  comments: ICommentRes[];
}
const CommentTable: React.FC<CommentTableProps> = ({ comments }) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
    },
    {
      field: "content",
      headerName: "Bình luận",
      width: 250,
    },
    {
      field: "postTitle",
      headerName: "Bài viết",
      width: 275,
    },
    {
      field: "createdDate",
      headerName: "Ngày bình luận",
      width: 205,
    },
    {
      field: "actions",
      headerName: "Chức năng",
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            navigate(`/post/${params.row.postId}`);
          }}
          size="small"
          color="success"
        >
          <SearchIcon />
        </IconButton>
      ),
    },
  ];
  const navigate = useNavigate();
  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <Paper sx={{ height: 400, width: 1000, px: 2, py: 2, mt: 2 }}>
      <DataGrid
        rows={comments}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
    </Paper>
  );
};
export default MyComments;
