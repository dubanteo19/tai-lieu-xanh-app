import { NewDocument, TopDocument } from "./TopDocument";

export const Banner = () => {
  return (
    <div className="flex text-center  flex-col rounded border-white bg-primary p-2 md:p-5">
      <h2 className="text-sm md:text-2xl font-bold">Tài liệu xanh</h2>
      <p className="text-center text-xs md:text-base mt-4">
        Nơi cùng nhau kết nối & chia sẽ những tài liệu học tập{" "}
      </p>
    </div>
  );
};
const RightPanel = () => {
  return (
    <div className="flex flex-col sticky gap-4">
      <TopDocument />
      <NewDocument />
    </div>
  );
};
export default RightPanel;
