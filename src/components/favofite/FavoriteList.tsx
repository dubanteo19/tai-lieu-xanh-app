import { IPost } from "@/type/IPost";
import { FC } from "react";
import { FavoritePostItem } from "./FavofiteItem";

interface FavoriteListProps {
  favorites: IPost[];
}
export const FavoriteList: FC<FavoriteListProps> = ({ favorites }) => {
  return (
    <div className="mt-2 px-10 gap-10 flex-col">
      {favorites &&
        favorites.map((post) => (
          <FavoritePostItem {...post} key={post.id} />
        ))}{" "}
    </div>
  );
};
