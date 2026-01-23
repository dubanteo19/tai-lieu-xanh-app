import React from "react";
import { useGetPostDetailQuery } from "../api/post.api";

export const PostPreview: React.FC<{ postId: number }> = ({ postId }) => {
  const { data: post, isLoading, isError } = useGetPostDetailQuery(postId);
  if (isLoading) {
    return <div></div>;
  }
  if (isError || !post) {
    return <p color="error">Unable to load post details.</p>;
  }
  return (
    <div sx={{ px: 2, pb: 5 }}>
      <div>
        <p>{post.major.majorName}</p>
        <PostInfo
          fullName={post.author.fullName}
          avatar={post.author.avatar}
          date={post.createdDate}
          title={post.title}
        />
      </div>
      <Divider variant="middle" />
      <PostBody
        isLoading={isLoading}
        mdoc={post.mdoc}
        description={post.description}
        postId={post.id}
      />
      <div>
        <p>Nhãn:</p>
        {post.tags?.map((tag) => (
        <div>{tag.}</div>
        ))}
      </div>
    </div>
  );
};
