import { FC } from "react";
import { Link } from "react-router-dom";
import { ImageHolder } from "../ui/image-holder";

interface PostInfoProps {
  avatar: string;
  fullName: string;
  date: string;
  title: string;
  id: number;
}
export const PostInfo: FC<PostInfoProps> = (info) => {
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
      <h4 className="font-bold text-2xl">{info.title}</h4>
    </div>
  );
};
