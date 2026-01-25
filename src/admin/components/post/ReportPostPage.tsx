import SearchBar from "@/shared/components/SearchBar";
import { Button } from "@/shared/ui/button";

export const ReportPostPage = () => {
  return (
    <div>
      <p>Tài liệu bị báo cáo</p>
      <div>
        <div>
          <Button>{"<- Quay lại"}</Button>
          <SearchBar color="primary.main" />
        </div>
      </div>
      <p>ReportPostsTable</p>
    </div>
  );
};
