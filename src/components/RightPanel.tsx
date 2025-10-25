import { NewDocument, TopDocument } from "./TopDocument";

export const Banner = () => {
  return (
    <div className="flex center flex-col rounded-2xl border-white bg-primary p-5">
      <h2 className="text-2xl">Tài liệu xanh</h2>
      <p className="text-center -5">
        Nơi cùng nhau kết nối & chia sẽ những tài liệu học tập cùng nhau bước
        qua những năm tháng học trò!
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
