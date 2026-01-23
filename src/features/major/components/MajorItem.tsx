import { NavLink } from "react-router-dom";
import { Major } from "../types/major.type";

export const MajorItem = ({ id, postCount, name }: Major) => {
  return (
    <div>
      <NavLink to={`/search?major=${id}`}>{name}</NavLink>
      <div>{postCount}</div>
    </div>
  );
};
