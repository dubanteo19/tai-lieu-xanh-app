import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetCommentsByPostIdQuery } from "../../api/commentApi";
import { IPostDetail } from "../../type/IPostDetail";
import { PostActionButtonGroup } from "./PostActionButtonGroup";
import { PostBody } from "./PostBody";
import PostComments from "./PostComments";
import { PostInfo } from "./PostInfo";
import { PostTags } from "./PostTags";

export const Detail: React.FC<IPostDetail> = (post) => {
  const { data, isLoading } = useGetCommentsByPostIdQuery(post.id);
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
      <PostBody
        mdoc={post.mdoc}
        isLoading={isLoading}
        description={post.description}
        postId={post.id}
      />
      <PostTags tags={post.tags} />
      <PostActionButtonGroup postId={post.id} />
      {data && <PostComments postId={post.id} comments={data} />}
    </div>
  );
};
