import { NavLink } from "react-router-dom";
import { Tag } from "../types/tag.type";

export const TagItem = ({ id, name }: Tag) => {
  return (
    <div>
      <NavLink to={`tags/${id}`}>{name}</NavLink>
    </div>
  );
};
