import { Grid2, Paper, Stack } from "@mui/material";
import { TopDocument, RelatedDocument } from "../components/TopDocument";
import { Detail } from "../components/PostDetail/Detail";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCommentForm } from "../features/comment/commentSlice";
import { useParams } from "react-router-dom";
import { useGetPostDetailQuery } from "../api/postApi";
import FullLoading from "../components/FullLoading";
const PostDetail = () => {
  const { postId } = useParams();
  const { data, isLoading } = useGetPostDetailQuery(Number(postId));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setCommentForm({
        postId,
      }),
    );
  }, [postId]);
  return (
    <Grid2
      sx={{
        bgcolor: "secondary.main",
        paddingY: 5,
        paddingX: 30,
        direction: "row",
      }}
      container
      spacing={2}
    >
      {isLoading && <FullLoading />}
      <Grid2 size={7}>{data && <Detail {...data} />}</Grid2>
      <Grid2 size={4} position="sticky" top="70px" alignSelf="start">
        <Stack spacing={3}>
          <TopDocument />
          <RelatedDocument />
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default PostDetail;
