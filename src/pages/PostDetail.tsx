import { Grid2, Stack } from "@mui/material";
import { TopDocument, RelatedDocument } from "../components/TopDocument";
import { Detail } from "../components/PostDetail/Detail";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCommentForm } from "../features/comment/commentSlice";
import { useParams } from "react-router-dom";
import { useGetPostDetailQuery, useViewPostMutation } from "../api/postApi";
import FullLoading from "../components/FullLoading";
export const PostDetail = () => {
  const { postId } = useParams();
  const { data, isLoading } = useGetPostDetailQuery(Number(postId));
  const [viewPost] = useViewPostMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    viewPost({
      postId: Number(postId),
    });
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
          <RelatedDocument postId={Number(postId)} />
          <TopDocument />
        </Stack>
      </Grid2>
    </Grid2>
  );
};

