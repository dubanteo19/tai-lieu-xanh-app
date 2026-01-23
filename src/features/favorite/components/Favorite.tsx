import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useSelector } from "react-redux";
import { useGetPostsByPostIdQuery } from "../api/postApi";
import { RootState } from "../app/store";
import { IFavoriteState } from "../features/favorite/favoriteSlice";
import { FavoriteList } from "./favofite/FavoriteList";
import FullLoading from "./FullLoading";
export const FavoritePage = () => {
  const postIdList: IFavoriteState[] = useSelector(
    (state: RootState) => state.favorite,
  );
  const { data: favorites, isLoading } = useGetPostsByPostIdQuery(
    postIdList.map((p) => p.postId).join("-"),
  );
  if (isLoading) return <FullLoading />;
  if (favorites)
    return (
      <div className="my-5">
        <h3 className="text-center">Danh sách tài liệu yêu thích</h3>
        <FavoriteList favorites={favorites} />
      </div>
    );
  return (
    <div className="my-5">
      <h3 className="text-center">
        Chưa có tài liệu nào trong danh sách yêu thích
      </h3>
      <div>
        <SentimentVeryDissatisfiedIcon color="primary" sx={{ fontSize: 100 }} />
      </div>
    </div>
  );
};
