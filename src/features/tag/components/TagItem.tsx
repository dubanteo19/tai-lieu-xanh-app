import { NavLink } from "react-router-dom";
import { Tag } from "../types/tag.type";

export const TagItem = ({ id, name }: Tag) => {
  return (
    <div className="bg-primary px-4 py-1 rounded-2xl text-white">
      <NavLink to={`tags/${id}`}>{name}</NavLink>
    </div>
  );
};
