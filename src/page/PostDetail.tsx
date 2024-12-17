import { Avatar, Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { TopDocument, RelatedDocument } from "../components/TopDocument";
import { Detail } from "../components/PostDetail/Detail";
import { postDetail } from "../data/postDetail";
const PostDetail = () => {
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
      <Grid2 size={7}>
        <Detail post={postDetail} />
      </Grid2>
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
