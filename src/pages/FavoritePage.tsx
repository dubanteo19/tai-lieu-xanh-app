import DownloadIcon from "@mui/icons-material/Download";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetPostsByPostIdQuery } from "../api/postApi";
import { RootState } from "../app/store";
import {
  favoriteRemove,
  IFavoriteState,
} from "../features/favorite/favoriteSlice";
import { IPost } from "../type/IPost";
import { getThumbUri } from "../utils/uri";
import { FC } from "react";
interface FavoriteListProps {
  favorites: IPost[];
}
const FavoritePostItem: FC<IPost> = (post) => {
  const dispatch = useDispatch();
  return (
    <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
      <Grid container>
        <Grid size={1}>
          <Box component={"img"} width={80} src={getThumbUri(post.thumb)}></Box>
        </Grid>
        <Grid size={9}>
          <Stack>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/post/${post.id}`}
            >
              <Typography variant="h6">{post.title}</Typography>
            </Link>
            <Typography>Ngày đăng: {post.createdDate}</Typography>
          </Stack>
        </Grid>
        <Grid size={2}>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
            }}
            spacing={2}
          >
            <Stack>
              <Stack direction="row" spacing={1}>
                <Typography>{post.author.fullName}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Stack spacing={1} direction="row">
                  <Typography>{post.views}</Typography>
                  <VisibilityIcon />
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography>{post.downloads || 0}</Typography>
                  <DownloadIcon />
                </Stack>
              </Stack>
            </Stack>
            <Button
              color="error"
              onClick={() => {
                dispatch(favoriteRemove({ postId: post.id }));
                toast.success("Xóa khỏi danh sách yêu thích");
              }}
              variant="contained"
            >
              Xóa
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};
const FavoriteList: FC<FavoriteListProps> = ({ favorites }) => {
  return (
    <Stack spacing={2} sx={{ mt: 2, px: 20 }}>
      {favorites &&
        favorites.map((post) => (
          <FavoritePostItem {...post} key={post.id} />
        ))}{" "}
    </Stack>
  );
};
export const FavoritePage = () => {
  const postIdList: IFavoriteState[] = useSelector(
    (state: RootState) => state.favorite,
  );
  const { data: favorites } = useGetPostsByPostIdQuery(
    postIdList.map((p) => p.postId).join("-"),
  );
  return (
    <Box>
      {favorites && favorites ? (
        <Box sx={{ my: 10 }}>
          <Typography textAlign="center" variant="h3">
            Danh sách tài liệu yêu thích
          </Typography>
          <FavoriteList favorites={favorites} />
        </Box>
      ) : (
        <Box sx={{ my: 10 }}>
          <Typography textAlign="center" variant="h3">
            Chưa có tài liệu nào trong danh sách yêu thích
          </Typography>
          <Box textAlign="center">
            <SentimentVeryDissatisfiedIcon
              color="primary"
              sx={{ fontSize: 100 }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
