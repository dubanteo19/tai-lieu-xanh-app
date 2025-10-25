import { MajorList } from "../components/MajorList";
import PostList from "../components/PostList";
import RightPanel, { Banner } from "../components/RightPanel";
const Home = () => {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 flex gap-4 w-full grow">
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
export default Home;
