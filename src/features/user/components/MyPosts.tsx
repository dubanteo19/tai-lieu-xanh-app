import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Button } from "@/shared/ui/button";
import { useGetUserPostsQuery } from "../api/user.api";

const SeachBar = () => {
  return (
    <div>
      <p>SearchIcon</p>
      <input placeholder="Bạn cần tìm gì?" />
    </div>
  );
};
const MyPosts = () => {
  const { id } = useAppSelector((state) => state.auth);
  const {
    data: posts,
    isLoading,
    refetch,
    isFetching,
  } = useGetUserPostsQuery(id);
  return (
    <div>
      <h3>Quản lý tài liệu</h3>
      <div>
        <Button>Tạo tài liệu mới</Button>
        <SeachBar />
      </div>
      <div>
        <div>
          <h5>Tất cả ({posts?.length})</h5>
          <Button
            onClick={refetch}
            disabled={isFetching} // Disable button while fetching
          >
            {isFetching ? "Đang làm mới dữ liệu..." : "Làm mới"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
