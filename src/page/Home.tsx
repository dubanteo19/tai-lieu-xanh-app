import { Box, Grid, Grid2, Stack } from "@mui/material"
import PostList from "../Components/PostList"
import RightPanel from "../Components/RightPanel"

const Home = () => {
    return (
        <Grid2 sx={{
            bgcolor: "secondary.main",
            paddingY: 10,
            paddingX: 30,
            direction: "row"
        }} container spacing={2}>
            <Grid2 size={8} >
                <PostList />
            </Grid2>
            <Grid2  size={4}>
                <RightPanel  />
            </Grid2>
        </Grid2>
    )
}
export default Home