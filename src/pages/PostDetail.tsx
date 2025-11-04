import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetPostDetailQuery, useViewPostMutation } from "../api/postApi";
import FullLoading from "../components/FullLoading";
import { Detail } from "../components/PostDetail/Detail";
import { RelatedDocument, TopDocument } from "../components/TopDocument";
import { setCommentForm } from "../features/comment/commentSlice";
export const PostDetail = () => {
  const { postId } = useParams();
  const { data, isLoading } = useGetPostDetailQuery(Number(postId));
  const [viewPost] = useViewPostMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    viewPost({
      postId: Number(postId),
    });
    dispatch(
      setCommentForm({
        postId,
      }),
    );
  }, [postId]);
  if (isLoading) return <FullLoading />;
  return (
    <div className="grid grid-cols-12 gap-4 mt-2">
      <div className="col-span-8">{data && <Detail {...data} />}</div>
      <div className="col-span-4">
        <div className="flex flex-col gap-2">
          <RelatedDocument postId={Number(postId)} />
          <TopDocument />
        </div>
      </div>
    </div>
  );
};
