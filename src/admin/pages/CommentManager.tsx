import { Stack, Typography } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { CommentTable } from "../components/comment/CommentTable";
import { useGetAllCommentsQuery } from "../api/adminCommentApi";
import FullLoading from "../../components/FullLoading";
export const CommentManager = () => {
  const { data: comments, isLoading } = useGetAllCommentsQuery();
  return (
    <Stack sx={{ px: 4 }}>
      <Typography fontWeight="bold" variant="h5">
        Quản lý bình luận
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        bgcolor="white"
        sx={{ mt: 2, px: 4, py: 2, borderRadius: 2 }}
        justifyContent="space-between"
      >
        <Stack>
          <SearchBar color="primary.main" />
        </Stack>
        <Stack direction="row" spacing={2}></Stack>
      </Stack>
      {isLoading && <FullLoading />}
      {comments && <CommentTable
        comments={comments}
      />}
    </Stack>
  );
};
