import SearchBar from "@/shared/components/SearchBar";
import { Button } from "@/shared/ui/button";
export const MajorManager = () => {
  return (
    <div>
      <h5>Quản lý danh mục ngành tài liệu</h5>
      <div>
        <div>
          <SearchBar color="primary.main" />
        </div>
        <div>
          <Button>Danh mục ngành tài liệu mới</Button>
        </div>
      </div>
      <p>Major tables</p>
    </div>
  );
};
