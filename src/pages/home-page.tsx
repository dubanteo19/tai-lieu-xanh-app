import { PostList } from "@/components/PostList";
import { MajorList } from "../components/MajorList";
import RightPanel, { Banner } from "../components/RightPanel";
export const Home = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 flex flex-col gap-4 w-full grow">
        <MajorList />
        <PostList />
      </div>
      <div className="col-span-1 flex flex-col gap-2">
        <Banner />
        <RightPanel />
      </div>
    </div>
  );
};
