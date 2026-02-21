import { TitleBar } from "@/shared/components/title-bar";
import { ImageHolder } from "@/shared/ui/image-holder";
import { shortText } from "@/shared/utils/shortText";
import { Link } from "react-router-dom";
import { PostSummary } from "../../types/post.type";
import {
  useGetHotPostsQuery,
  useGetNewPostsQuery,
  useGetRelatedPostsQuery,
} from "../api/post.api";
const DocumentItem = (post: PostSummary) => {
  return (
    <div>
      <ImageHolder src={post.thumbnail} />
      <div>
        <div>
          <p>{shortText(post.title, 25)}</p>
        </div>
        <div>aySettingsIcon s</div>
        <div>
          RemoveRedEyeIcon
          <p>{post.views || 0}</p>
          CloudDownloadIcon
          <p>{post.downloads || 0}</p>
        </div>
      </div>
    </div>
  );
};
export const RecDocumentItem = (post: PostSummary) => {
  return (
    <div>
      <Link to={`/post/${post.id}`}>
        <p>{shortText(post.title, 30)}</p>
      </Link>
      <div>
        <div>
          RemoveRedEyeIcon
          <p>{post.views}</p>
        </div>
        <div>
          oudDownloadIcon
          <p>{post.downloads || 0}</p>
        </div>
      </div>
    </div>
  );
};

export const NewDocument = () => {
  const { data: newPosts } = useGetNewPostsQuery();
  return (
    <div>
      <TitleBar text="TÀI LIỆU MỚI" />
      <div>
        {newPosts &&
          newPosts.map((post) => <RecDocumentItem key={post.id} {...post} />)}
      </div>
    </div>
  );
};

export const TopDocument = () => {
  const { data: hotPosts } = useGetHotPostsQuery();
  return (
    <div>
      <TitleBar text="TÀI LIỆU HOT" />
      <div>
        {hotPosts &&
          hotPosts.map((doc) => <DocumentItem key={doc.id} {...doc} />)}
      </div>
    </div>
  );
};

export const RelatedDocument = ({ postId }: { postId: number }) => {
  const { data: relatedPosts } = useGetRelatedPostsQuery({ postId });
  return (
    <div>
      <TitleBar text="TÀI LIỆU LIÊN QUAN" />
      <div>
        {relatedPosts &&
          relatedPosts.map((doc) => <DocumentItem key={doc.id} {...doc} />)}
      </div>
    </div>
  );
};
