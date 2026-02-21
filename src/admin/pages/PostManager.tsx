import SearchBar from "@/shared/components/search-bar";
import { Button } from "@/shared/ui/button";
export const PostManager = () => {
  return (
    <div>
      <h5>Quản lý tài liệu</h5>
      <div>
        <div>
          <SearchBar color="primary.main" />
        </div>
        <div>
          <Button>Tài liệu mới</Button>
          <Button>Tài liệu bị xóa</Button>
          <Button>Duyệt tài liệu</Button>
          <Button>Tài liệu bị báo cáo</Button>
        </div>
      </div>
      <p>PostTable</p>
    </div>
  );
};
