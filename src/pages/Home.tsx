import { Box, Grid2 } from "@mui/material";
import PostList from "../components/PostList";
import RightPanel, { Banner } from "../components/RightPanel";
import { MajorList } from "../components/MajorList";

const Home = () => {
  return (
    <Box>
      <Grid2
        sx={{
          bgcolor: "secondary.main",
          paddingY: 3,
          paddingX: 30,
          direction: "row",
        }}
        container
        spacing={2}
      >
        <Grid2 size={8}>
          <MajorList />
          <PostList />
        </Grid2>
        <Grid2 size={4}>
          <Banner />
          <RightPanel />
        </Grid2>
      </Grid2>
    </Box>
  );
};
export default Home;
