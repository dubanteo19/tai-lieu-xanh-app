import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Avatar,
  Stack,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EmailIcon from "@mui/icons-material/Email";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetInfoQuery, useGetUserPostsQuery } from "../api/userApi";
import { getThumbUri } from "../utils/uri";
import FullLoading from "../components/FullLoading";
import { IPost } from "../type/IPost";
import { Post } from "@/components/post/Post";
export const UserPostList: FC<{ userId: number }> = ({ userId }) => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data, isLoading, isSuccess } = useGetUserPostsQuery(userId);

  useEffect(() => {
    if (isSuccess && data) {
      setPosts((prevPosts) => [...prevPosts, ...data]);
    }
  }, [data, isSuccess]);
  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleHidePost = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };
  return (
    <Stack sx={{ mt: 2 }}>
      {isLoading ? (
        <FullLoading />
      ) : (
        posts?.map((post: IPost) => (
          <Post key={post.id} handleHidePost={handleHidePost} post={post} />
        ))
      )}
      <Button
        onClick={handleShowMore}
        disabled={isLoading}
        variant="contained"
        sx={{
          my: 2,
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        Xem thêm
      </Button>
    </Stack>
  );
};
export const UserProfilePage: React.FC = () => {
  const { userId } = useParams();
  const { data } = useGetInfoQuery(Number(userId));
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ minHeight: 320, width: 800, py: 2, px: 5 }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            position: "relative",
          }}
        >
          Thông tin tài khoản
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Box position="relative">
            <Avatar
              sx={{ width: 80, height: 80 }}
              src={getThumbUri(data?.avatar || "")}
            />
          </Box>
        </Box>
        <Box>
          <Paper
            sx={{ p: 2, width: 500, my: 2, mx: "auto", position: "relative" }}
          >
            <Typography
              sx={{ position: "absolute", top: -10, fontStyle: "italic" }}
              variant="body1"
            >
              Tiểu sử:
            </Typography>
            <Typography>{data?.bio || "Chưa có tiểu sử"}</Typography>
          </Paper>
        </Box>
        <List
          sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}
          aria-label="contacts"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Tên người dùng" />
              <ListItemText
                sx={{ textAlign: "right" }}
                primary={data?.fullName}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Email:" />
              <ListItemText
                sx={{ textAlign: "right" }}
                primary={data?.email || "Chưa có email"}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Diversity3Icon />
              </ListItemIcon>
              <ListItemText primary="Bạn bè" />
              <ListItemText
                sx={{ textAlign: "right" }}
                primary={data?.friends || 0}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Bài viết" />
              <ListItemText
                sx={{ textAlign: "right" }}
                primary={data?.posts || 0}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        ></Box>
      </Paper>
      {userId && <UserPostList userId={Number(userId)} />}
    </Stack>
  );
};
