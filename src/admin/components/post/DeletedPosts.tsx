import SearchBar from "@/shared/components/search-bar";
import { Button } from "@/shared/ui/button";

export const DeletedPosts = () => {
  return (
    <div>
      <h5>Quản lý tài liệu bị xóa</h5>
      <div>
        <div>
          <Button>{"<- Quay lại"}</Button>
          <SearchBar color="primary.main" />
        </div>
      </div>
      <p>DeletedPostsTable</p>
    </div>
  );
};
