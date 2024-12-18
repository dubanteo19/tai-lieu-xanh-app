import { Box, Grid2 } from "@mui/material";
import PostList from "../components/PostList";
import RightPanel from "../components/RightPanel";
import { MajorList } from "../components/MajorList";
import { majors } from "../admin/page/MajorManager";

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
        <MajorList majors={majors} />
        <Grid2 size={8}>
          <PostList />
        </Grid2>
        <Grid2 size={4}>
          <RightPanel />
        </Grid2>
      </Grid2>
    </Box>
  );
};
export default Home;
