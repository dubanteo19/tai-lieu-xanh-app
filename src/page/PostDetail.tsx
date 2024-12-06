import { Avatar, Box, Button, Grid2, Stack, Typography } from '@mui/material'
import React from 'react'
import RightPanel from '../Components/RightPanel'
import PostList from '../Components/PostList'
import { TopDocument } from '../Components/TopDocument'
import { Detail } from '../Components/PostDetail/Detail'
import { postDetail } from '../data/postDetail'
const PostDetail = () => {
    return (
        <Grid2 sx={{
            bgcolor: "secondary.main",
            paddingY: 10,
            paddingX: 30,
            direction: "row"
        }} container spacing={2}>
            <Grid2 size={7} >
                <Detail post={postDetail} />
            </Grid2>
            <Grid2 size={4}>
                <Stack spacing={3}>
                    <TopDocument />
                </Stack >
            </Grid2>
        </Grid2>
    )
}

export default PostDetail