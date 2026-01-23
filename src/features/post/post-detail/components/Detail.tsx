import { Link } from "react-router-dom";
import { PostActionButtonGroup } from "./PostActionButtonGroup";
import { PostBody } from "./PostBody";
import PostComments from "./PostComments";
import { PostInfo } from "./PostInfo";
import { PostTags } from "./PostTags";
import { PostDetail } from "../../types/post.type";
import { useGetCommentsByPostIdQuery } from "@/features/comment/api/comment.api";

export const Detail = (post: PostDetail) => {
  const { data, isLoading } = useGetCommentsByPostIdQuery(post.id);
  return (
    <div className="shadow">
      <div className="relative">
        <Link
          className="absolute top-[50px] right-0 rotate-12 p-2 border-2 border-primary
          text-primary "
          to={`/search?major=${post.major.id}`}
        >
          {post.major.name}
        </Link>
        <PostInfo
          id={post.author.id}
          fullName={post.author.fullName}
          avatar={post.author.avatarUrl}
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
