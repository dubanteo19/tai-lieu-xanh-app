import { MajorList } from "@/features/major/components/MajorList";
import { PostList } from "@/features/post/post-list/components/PostList";
import { Banner } from "@/shared/components/banner";
import { RightPanel } from "@/shared/components/right-panel";

export const HomePage = () => {
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
