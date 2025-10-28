import { Button } from "../ui/button";
import FavoriteIcon from "@mui/icons-material/Favorite";
export const PostFooter = () => {
  return (
    <div className="flex gap-2">
      <div className="flex items-center">
        <h4>Yêu thích</h4>
        <Button>
          <FavoriteIcon color="error" />
        </Button>
      </div>
      <Button>Xem chi tiết</Button>
      <Button>Bình luận</Button>
    </div>
  );
};
