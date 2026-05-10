import { ROUTES } from "@/app/router/routes";
import { usePostCard } from "@/features/post/post-list/components/post-card/PostCard.context";
import { LinkButton } from "@/shared/components/link-button";
import { Button } from "@/shared/ui/button";
import { ThumbsUp } from "lucide-react";
export const PostCardFooter = () => {
  const { post } = usePostCard();
  const postId = post.id;
  return (
    <div className="flex gap-2">
      <div className="flex items-center">
        <Button variant={"outline"}>
          <ThumbsUp />
        </Button>
      </div>
      <LinkButton href={ROUTES.post_detail(postId)} variant={"outline"}>
        Xem chi tiết
      </LinkButton>
      <Button variant="outline">Bình luận</Button>
    </div>
  );
};
