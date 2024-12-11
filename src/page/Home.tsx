import { Box, Grid, Grid2, Stack } from "@mui/material";
import PostList from "../components/PostList";
import RightPanel from "../components/RightPanel";
import { useState } from "react";

const Home = () => {
  return (
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
        <PostList />
      </Grid2>
      <Grid2 size={4}>
        <RightPanel />
      </Grid2>
    </Grid2>
  );
};
export default Home;
