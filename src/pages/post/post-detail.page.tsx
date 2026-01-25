import { Detail } from "@/features/post/post-detail/components/Detail";
import { useGetPostDetailQuery } from "@/features/post/post-list/api/post.api";
import {
  RelatedDocument,
  TopDocument,
} from "@/features/post/post-list/components/TopDocument";
import FullLoading from "@/shared/components/FullLoading";
import { useParams } from "react-router-dom";
export const PostDetailPage = () => {
  const { postId } = useParams();
  const { data, isLoading } = useGetPostDetailQuery(Number(postId));
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
