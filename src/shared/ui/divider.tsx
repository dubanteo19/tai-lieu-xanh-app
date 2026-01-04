import { FC } from "react";

interface DividerProps {
  size?: number;
}
export const Divider: FC<DividerProps> = ({ size = 2 }) => {
  return <div className={`w-full px-10 bg-primary`} style={{ height: size }} />;
};
