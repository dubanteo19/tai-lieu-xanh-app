import { Button } from "@/shared/ui/button";
import { ThumbsUp } from "lucide-react";
export const PostCardFooter = () => {
  return (
    <div className="flex gap-2">
      <div className="flex items-center">
        <Button>
          <ThumbsUp />
        </Button>
      </div>
      <Button>Xem chi tiết</Button>
      <Button variant="outline">Bình luận</Button>
    </div>
  );
};
