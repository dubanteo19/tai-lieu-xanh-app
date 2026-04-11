import { QuoteIcon } from "lucide-react";

export const Banner = () => {
  return (
    <div className="flex text-center  flex-col rounded border-white bg-primary p-2 md:p-5 text-white">
      <h2>Tài liệu xanh</h2>
      <div className="relative flex flex-col items-center max-w-lg">
        <QuoteIcon className="transfrom rotate-180 self-start opacity-80" />
        <p className="text-center text-xs md:text-base mt-4 italic leading-relaxed">
          Nơi cùng nhau kết nối & chia sẽ những tài liệu học tập{" "}
        </p>
        <QuoteIcon className="self-end opacity-80" />
      </div>
    </div>
  );
};
