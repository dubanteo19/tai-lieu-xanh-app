import { FrownIcon } from "lucide-react";
import { ReactNode } from "react";

interface NotFoundListProps {
  children: ReactNode;
}
export const EmptyList = ({ children }: NotFoundListProps) => {
  return (
    <div className="flex-center gap-[1px]">
      <p className="text-center px-4 py-2 text-gray-500">{children}</p>
      <FrownIcon size={18} />
    </div>
  );
};
