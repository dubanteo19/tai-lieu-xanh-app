import SearchBar from "@/shared/components/SearchBar";
import { useGetAllCommentsQuery } from "../api/adminCommentApi";
export const CommentManager = () => {
  const { data: comments, isLoading } = useGetAllCommentsQuery();
  return (
    <div>
      <h5>Quản lý bình luận</h5>
      <div>
        <div>
          <SearchBar color="primary.main" />
        </div>
      </div>
      CommentTable
    </div>
  );
};
