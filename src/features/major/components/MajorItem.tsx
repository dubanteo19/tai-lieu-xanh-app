import { NavLink } from "react-router-dom";
import { Major } from "../types/major.type";

export const MajorItem = ({ id, postCount, name }: Major) => {
  return (
    <div className="bg-primary text-white  px-3 py-2 rounded-2xl">
      <NavLink to={`/search?major=${id}`}>{name}</NavLink>
      <div>{postCount}</div>
    </div>
  );
};
