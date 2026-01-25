import { PostCardItem } from "@/features/post/post-list/components/post-card/PostCardItem";
import { PostSummary } from "@/features/post/types/post.type";
import {
  useGetInfoQuery,
  useGetUserPostsQuery,
} from "@/features/user/api/user.api";
import FullLoading from "@/shared/components/FullLoading";
import { ImageHolder } from "@/shared/ui/image-holder";
import { getThumbUri } from "@/shared/utils/uri";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface UserPostListProps {
  userId: number;
}
export const UserPostList = ({ userId }: UserPostListProps) => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const { data, isLoading, isSuccess } = useGetUserPostsQuery(userId);

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
  if (isLoading) return <FullLoading />;
  return (
    <div>
      {posts?.map((post) => (
        <PostCardItem
          key={post.id}
          handleHidePost={handleHidePost}
          post={post}
        />
      ))}
      <button onClick={handleShowMore} disabled={isLoading}>
        Xem thêm
      </button>
    </div>
  );
};
export const UserProfilePage = () => {
  const { userId } = useParams();
  const { data } = useGetInfoQuery(Number(userId));
  return (
    <div>
      <div>
        <h3>Thông tin tài khoản</h3>
        <div>
          <div>
            <ImageHolder src={getThumbUri(data?.avatar || "")} />
          </div>
        </div>
        <div>
          <div>
            <p>Tiểu sử:</p>
            <p>{data?.bio || "Chưa có tiểu sử"}</p>
          </div>
        </div>
      </div>
      {userId && <UserPostList userId={Number(userId)} />}
    </div>
  );
};
