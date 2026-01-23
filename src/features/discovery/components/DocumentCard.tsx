import { PostSummary } from "@/features/post/types/post.type";
import { NavLink } from "react-router-dom";

export const DocumentCard = (post: PostSummary) => {
  return (
    <div>
      <div>
        <div />
        <div>
          <NavLink to={"/post/" + post.id}>
            <p>{post.title}</p>
          </NavLink>
          <NavLink to={"/profile/" + post.author.id}>
            <p>{post.author.fullName}</p>
          </NavLink>
          <p>
            {post.downloads} Lượt tải - {post.views} Lượt xem
          </p>
        </div>
      </div>
    </div>
  );
};
