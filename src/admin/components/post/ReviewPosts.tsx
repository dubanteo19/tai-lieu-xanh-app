import SearchBar from "@/shared/components/search-bar";
import { Button } from "@/shared/ui/button";
import { ReactNode } from "react";
export const CenterCell = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};
export const ReviewPosts = () => {
  return (
    <div>
      <p>Duyệt tài liệu</p>
      <div>
        <div>
          <Button>{" Quay lại"}</Button>
          <SearchBar color="primary.main" />
        </div>
      </div>
      <p>Review post tables</p>
    </div>
  );
};
