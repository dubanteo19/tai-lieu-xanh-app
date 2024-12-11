import { Typography, Paper, Avatar, Divider, Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { friends } from "../../data/friends";
import DownloadIcon from "@mui/icons-material/Download";
import ArticleIcon from "@mui/icons-material/Article";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { posts } from "../../data/posts";
import { Post } from "../PostList";
interface FriendItemProps {
  item: {
    id: number;
    fullName: string;
    avatar: string;
  };
}
const FriendItem: React.FC<FriendItemProps> = ({ item }) => {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.07)", // light gray
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid size={3}>
          <Avatar src={item.avatar} />
        </Grid>
        <Grid size={7}>
          <Typography>{item.fullName}</Typography>
        </Grid>
        <Grid size={2}>
          <MoreHorizIcon />
        </Grid>
      </Grid>
    </Box>
  );
};
const MyFriends: React.FC = () => {
  const friendDetail1 = {
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    fullName: "Du Ban Teo",
    id: 1,
    likes: 10,
  };
  return (
    <Paper sx={{ minHeight: 320 }}>
      <Grid container>
        <Grid size={3}>
          <Paper
            sx={{
              p: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                position: "relative",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Danh sách bạn bè
            </Typography>
            <Divider orientation="horizontal" />
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              100 người bạn
            </Typography>
            <Stack spacing={2}>
              {friends.map((friend) => (
                <FriendItem item={friend} key={friend.id} />
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid size={9}>
          <FriendDetail friend={friendDetail1} />
        </Grid>
      </Grid>
    </Paper>
  );
};
interface FriendDetailProps {
  friend: {
    id: number;
    fullName: string;
    avatar: string;
    likes: number;
  };
}
export const FriendDetail: React.FC<FriendDetailProps> = ({ friend }) => {
  return (
    <Stack sx={{ p: 2 }}>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ width: 80, height: 80 }}
          src="https://randomuser.me/api/portraits/women/10.jpg"
        />
        <Typography fontWeight="bold">{friend.fullName}</Typography>
      </Stack>
      <Grid container position="sticky" top="20px" self-align="start">
        <Grid size={4}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">Giới thiệu</Typography>
            <Stack spacing={1}>
              <Stack direction="row">
                <LocalPhoneIcon />
                <Typography>Số điện thoại: 0925821477</Typography>
              </Stack>
              <Stack direction="row">
                <DownloadIcon />
                <Typography>Lượt tải:10</Typography>
              </Stack>
              <Stack direction="row">
                <ArticleIcon />
                <Typography>Tổng số tài liệu :70</Typography>
              </Stack>
              <Stack direction="row">
                <ThumbUpIcon />
                <Typography>Lượt thích :20</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        <Grid size={8}>
          <Stack>
            {posts.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
export default MyFriends;
