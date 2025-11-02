import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGetCommentsByPostIdQuery } from "../../api/commentApi";
import { IPostDetail } from "../../type/IPostDetail";
import { PostBody } from "./PostBody";
import PostComments from "./PostComments";
import { PostInfo } from "./PostInfo";
import { PostActionButtonGroup } from "./PostActionButtonGroup";

export const Detail: React.FC<IPostDetail> = (post) => {
  const { data, isLoading } = useGetCommentsByPostIdQuery(post.id);
  const navigate = useNavigate();
  return (
    <div className="shadow">
      <div className="relative">
        <Link
          className="absolute top-[50px] right-0 rotate-12 p-2 border-2 border-primary
          text-primary "
          to={`/search?major=${post.major.id}`}
        >
          {post.major.majorName}
        </Link>
        <PostInfo
          id={post.author.id}
          fullName={post.author.fullName}
          avatar={post.author.avatar}
          date={post.createdDate}
          title={post.title}
        />
      </div>
      <Divider variant="middle" />
      <PostBody
        mdoc={post.mdoc}
        isLoading={isLoading}
        description={post.description}
        postId={post.id}
      />
      <Stack direction="row" spacing={1} sx={{ my: 2 }}>
        <Typography variant="h5">Nhãn:</Typography>
        {post.tags &&
          post.tags.map((tag) => (
            <Chip
              key={tag.tagName}
              onClick={() => {
                navigate(`/search?tags=${tag.tagName}`);
              }}
              label={tag.tagName}
            />
          ))}
      </Stack>
      <PostActionButtonGroup postId={post.id} />
      {data && <PostComments postId={post.id} comments={data} />}
    </div>
  );
};
