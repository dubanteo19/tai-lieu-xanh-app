import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Button, Paper, Avatar, Stack, InputBase, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import { PostProps } from '../PostList';
import { posts } from '../../data/posts';
const SeachBar = () => {
    return (
        <Box sx={{
            marginX: 2,
            border: "1px solid rgba(0,0,0,0.3)",
            borderRadius: 2,
            height: 40,
            paddingX: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <SearchIcon sx={{ mr: 2, color: "gray" }} onClick={() => {
            }} />
            <InputBase
                sx={{
                    width: 250,
                    color: "gray",
                    'input::placeholder': {
                        color: "gray",
                        opacity: 1
                    }
                }}
                placeholder='Bạn cần tìm gì?'
            />
        </Box>
    );
}
const MyPostItem: React.FC<PostProps> = ({ post }) => {
    return (
        <Paper sx={{ p: 2 }}>
            <Grid container>
                <Grid item xs={1}>
                    <Box>
                        <Avatar variant='square' src={post.thumb} />
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <Stack>
                        <Typography variant='h6'>
                            {post.title}
                        </Typography>
                        <Typography>
                            Ngày đăng: {post.date}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={2}>
                    <Stack>
                        <Stack direction="row" spacing={1} >
                            <Typography>
                                {post.author.fullName}
                            </Typography>
                            <Avatar sx={{ width: 20, height: 20 }} src={post.author.avatar} />
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Stack spacing={1} direction="row">
                                <Typography>
                                    {post.views}
                                </Typography>
                                <VisibilityIcon />
                            </Stack>
                            <Stack spacing={1} direction="row">
                                <Typography>
                                    {post.downloads}
                                </Typography>
                                <DownloadIcon />
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>

    )
}
const MyPosts: React.FC = () => {
    return (
        <Paper sx={{ minHeight: 320, px: 5 }}>
            <Typography variant='h3' sx={{
                textAlign: 'center',
                position: 'relative',
                marginBottom: '20px',
            }}>
                Quản lý tài liệu
            </Typography>
            <Stack direction="row" spacing={4} sx={{ px: 5 }}>
                <Button startIcon={<AddIcon />} variant='contained' sx={{ color: "white", fontWeight: "bold" }} >
                    Tạo tài liệu mới
                </Button>
                <SeachBar />
            </Stack>
            <Box sx={{ py: 5 }}>
                <Typography variant='h5'>
                    Tất cả (10)
                </Typography>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    {posts.map((post) => <MyPostItem post={post} key={post.id} />)}
                </Stack>
            </Box>
        </Paper >
    )
}

export default MyPosts