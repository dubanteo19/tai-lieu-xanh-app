import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetPostsByPostIdQuery } from "../api/postApi";
import { RootState } from "../app/store";
import { IFavoriteState } from "../features/favorite/favoriteSlice";
import { FavoriteList } from "./favofite/FavoriteList";
export const FavoritePage = () => {
  const postIdList: IFavoriteState[] = useSelector(
    (state: RootState) => state.favorite,
  );
  const { data: favorites } = useGetPostsByPostIdQuery(
    postIdList.map((p) => p.postId).join("-"),
  );
  if (favorites)
    return (
      <Box sx={{ my: 10 }}>
        <Typography textAlign="center" variant="h3">
          Danh sách tài liệu yêu thích
        </Typography>
        <FavoriteList favorites={favorites} />
      </Box>
    );
  return (
    <Box sx={{ my: 10 }}>
      <Typography textAlign="center" variant="h3">
        Chưa có tài liệu nào trong danh sách yêu thích
      </Typography>
      <Box textAlign="center">
        <SentimentVeryDissatisfiedIcon color="primary" sx={{ fontSize: 100 }} />
      </Box>
    </Box>
  );
};
