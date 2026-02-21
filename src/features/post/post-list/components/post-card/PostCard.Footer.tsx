import { Button } from "@/shared/ui/button";
import { HeaterIcon } from "lucide-react";
export const PostCardFooter = () => {
  return (
    <div className="flex gap-2">
      <div className="flex items-center">
        <Button>
          <HeaterIcon />i
        </Button>
      </div>
      <Button>Xem chi tiết</Button>
      <Button>Bình luận</Button>
    </div>
  );
};
