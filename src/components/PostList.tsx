import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IPost } from "../type/IPost";
import { useGetAllPublishedPostsQuery } from "../api/postApi";
import { Link, useNavigate } from "react-router-dom";
import { getThumbUri } from "../utils/uri";
import FullLoading from "./FullLoading";
import {
  favoriteAdd,
  favoriteRemove,
} from "../features/favorite/favoriteSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
interface NoThumbProps {
  width: number;
  height: number;
}
export const NoThumb: React.FC<NoThumbProps> = ({ width, height }) => {
  return (
    <Box
      width={width}
      height={height}
      sx={{
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#888",
        fontSize: "34px",
        textAlign: "center",
      }}
    >
      Không có hình xem trước
    </Box>
  );
};
export const Post: React.FC<
  IPost & { handleHidePost: (id: number) => void }
> = (post) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorite = useSelector((state: RootState) => state.favorite);
  const isInFavorite = favorite.some((p) => p.postId === post.id);
  return (
    <Paper sx={{ my: 1, p: 3 }}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Avatar src={getThumbUri(post.author?.avatar || "")} />
        <Stack sx={{ flexBasis: "80%", ml: 2 }}>
          <Link style={{ color: "black" }} to={`/profile/${post.author.id}`}>
            <Typography>{post.author.fullName}</Typography>
          </Link>
          <Typography>{post.createdDate}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton
            sx={{
              "&:focus": { outline: "none" },
            }}
            onClick={() => {
              post.handleHidePost(post.id);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Stack sx={{ position: "relative" }}>
        <Typography variant="h5">
          <Link
            to={`/post/${post.id}`}
            style={{
              color: "black",
            }}
          >
            {post.title}
          </Link>
        </Typography>
        {post.major && (
          <Button
            onClick={() => {
              navigate(`/search?major=${post.major.id}`);
            }}
            sx={{
              py: 1,
              cursor: "pointer",
              width: "fit-content",
              borderRadius: 2,
              position: "absolute",
              top: 25,
              my: 2,
              px: 2,
              bgcolor: "primary.main",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <Typography>{post.major.majorName}</Typography>
          </Button>
        )}
        {post.thumb ? (
          <Box
            onClick={() => {
              navigate(`/post/${post.id}`);
            }}
            component="img"
            sx={{ cursor: "pointer" }}
            width={600}
            height={400}
            src={getThumbUri(post.thumb)}
          ></Box>
        ) : (
          <NoThumb width={600} height={400} />
        )}
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <VisibilityIcon />
          {post.views}
        </Box>
        <Stack direction="row" spacing={2}>
          <Typography>{post.comments} bình luận</Typography>
          <Typography>{post.downloads | 0} lượt tải</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ pb: 2 }}>
        <Typography fontWeight={"bold"}>Tags:</Typography>
        {post.tags &&
          post.tags.map((tag) => (
            <Chip
              key={tag}
              onClick={() => navigate(`/search?tags=${tag}`)}
              label={tag}
              size="small"
            />
          ))}
      </Stack>
      <Stack direction="row" spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Yêu thích</Typography>
          <IconButton
            sx={{
              alignItems: "end",
              "&:focus": {
                outline: "none",
              },
            }}
            onClick={() => {
              !isInFavorite
                ? dispatch(favoriteAdd({ postId: post.id }))
                : dispatch(favoriteRemove({ postId: post.id }));
              const message = isInFavorite
                ? "Xóa khỏi danh sách yêu thích thành công"
                : "Thêm vào danh sách yêu thích thành công";
              toast.success(message, {
                autoClose: 1000,
                position: "bottom-left",
              });
            }}
          >
            {isInFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </IconButton>
        </Box>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate(`/post/${post.id}`);
          }}
          startIcon={<VisibilityIcon />}
        >
          Xem chi tiết
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            navigate(`/post/${post.id}#post-comments`);
          }}
          startIcon={<CommentIcon />}
        >
          Bình luận
        </Button>
      </Stack>
    </Paper>
  );
};
const PostList = () => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data, isLoading, isSuccess } = useGetAllPublishedPostsQuery({
    page,
    size: 4,
  });
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
    <Stack>
      {isLoading ? (
        <FullLoading />
      ) : (
        posts?.map((post: IPost) => (
          <Post key={post.id} handleHidePost={handleHidePost} {...post} />
        ))
      )}
      <Button
        onClick={handleShowMore}
        disabled={isLoading}
        variant="contained"
        sx={{
          marginTop: 2,
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        Xem thêm
      </Button>
    </Stack>
  );
};
export default PostList;
