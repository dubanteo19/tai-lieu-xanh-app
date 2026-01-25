import { Comment } from "@/features/comment/types/comment.type";

interface PostCommentsProps {
  comments: Comment[];
  postId: number;
}
const PostComments = ({ comments }: PostCommentsProps) => {
  if (!comments.length) return <p>Chưa có bình luận</p>;
  return (
    <div>
      <p>Bình luận({comments.length})</p>
      <CommentBox />
      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
};
const CommentBox = () => {
  return (
    <div>
      <textarea />
      <div>Lưu bình luận</div>
    </div>
  );
};

const CommentItem = (comment: Comment) => {
  return (
    <div>
      <div>
        <div>
          <div>
            <p>{comment.author.fullName}</p>
            {comment.status === "DELETED" ? (
              <p>Bình luận đã bị xóa</p>
            ) : (
              <p>{comment.content}</p>
            )}
          </div>
          <p>{comment.createdDate}</p>
        </div>
      </div>
    </div>
  );
};
export default PostComments;
