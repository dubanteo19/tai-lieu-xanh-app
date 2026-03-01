import { ImageHolder } from "@/shared/ui/image-holder";
import { Link } from "react-router-dom";

interface PostInfoProps {
  avatar: string;
  fullName: string;
  date: string;
  title: string;
  id: number;
}
export const PostInfo = (info: PostInfoProps) => {
  return (
    <div className="p-2">
      <div className="flex flex-row gap-4 items-center">
        <ImageHolder src={info.avatar} />
        <div>
          <Link style={{ color: "black" }} to={`/profile/${info.id}`}>
            {info.fullName}
          </Link>
          <p className="text-sm">{info.date}</p>
        </div>
      </div>
      <h3 className="font-bold text-primary text-2xl">{info.title}</h3>
    </div>
  );
};
