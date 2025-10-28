import { IPost } from "@/type/IPost";
import { FC } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";
import { PostHeader } from "./PostHeader";
import { Button } from "../ui/button";
import { Box, Chip, Stack } from "@mui/material";
import { getThumbUri } from "@/utils/uri";
import { NoThumb } from "../ui/no-thumb";
import { PostFooter } from "./PostFooter";

interface PostProps {
  post: IPost;
  handleHidePost: (id: number) => void;
}
export const Post: FC<PostProps> = (props) => {
  const { handleHidePost, post } = props;
  const navigate = useNavigate();
  return (
    <div>
      <PostHeader
        author={post.author}
        postCreatedDate={post.createdDate}
        handleHidePost={handleHidePost}
      />
      <Stack sx={{ position: "relative" }}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
        {post.major && (
          <Button
            onClick={() => {
              navigate(`/search?major=${post.major.id}`);
            }}
          >
            <p>{post.major.majorName}</p>
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
          <NoThumb width={250} height={100} />
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
        <div className="flex gap-2">
          <p>{post.comments} bình luận</p>
          <p>{post.downloads | 0} lượt tải</p>
        </div>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ pb: 2 }}>
        <p>Tags:</p>
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
      <PostFooter />
    </div>
  );
};
