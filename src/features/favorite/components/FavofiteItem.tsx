import { PostSummary } from "@/features/post/types/post.type";
import { Button } from "@/shared/ui/button";
import { getThumbUri } from "@/shared/utils/uri";
import { Link } from "react-router-dom";
export const FavoritePostItem = (post: PostSummary) => {
  return (
    <div>
      <div>
        <div>
          <img src={getThumbUri(post.thumbnail)}></img>
        </div>
        <div>
          <div>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/post/${post.id}`}
            >
              <h6>{post.title}</h6>
            </Link>
            <p>Ngày đăng: {post.createdDate}</p>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div>
                <p>{post.author.fullName}</p>
              </div>
              <div>
                <div>
                  <p>{post.views}</p>
                  VisibilityIcon
                </div>
                <div>
                  <p>{post.downloads || 0}</p>
                  DownloadIcon
                </div>
              </div>
            </div>
            <Button>Xóa</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
