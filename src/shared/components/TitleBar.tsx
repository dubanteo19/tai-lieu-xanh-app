import { FC } from "react";
interface TitleBarProps {
  text: string;
}
export const TitleBar: FC<TitleBarProps> = ({ text }) => {
  return (
    <div className="p-2 bg-primary rounded">
      <h3 className="text-center font-bold text-white">{text}</h3>
    </div>
  );
};
