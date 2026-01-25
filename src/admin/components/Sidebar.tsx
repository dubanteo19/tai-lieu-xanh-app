import { navData } from "../data/navData";
import { NavContent } from "./NavContent";
export const Sidebar = () => {
  return (
    <div>
      <NavContent data={navData} />
    </div>
  );
};
