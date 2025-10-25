import { IPost } from "@/type/IPost";
import { Stack } from "@mui/material";
import { FC } from "react";
import { FavoritePostItem } from "./FavofiteItem";

interface FavoriteListProps {
  favorites: IPost[];
}
export const FavoriteList: FC<FavoriteListProps> = ({ favorites }) => {
  return (
    <Stack spacing={2} sx={{ mt: 2, px: 20 }}>
      {favorites &&
        favorites.map((post) => (
          <FavoritePostItem {...post} key={post.id} />
        ))}{" "}
    </Stack>
  );
};
