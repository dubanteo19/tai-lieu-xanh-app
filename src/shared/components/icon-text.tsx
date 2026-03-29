import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IconTextProps {
  children: ReactNode;
  icon: ReactNode;
  className?: string;
}
export const IconText = ({ children, icon, className }: IconTextProps) => {
  return (
    <div className={cn("inline-flex gap-1.5 items-center text-lg", className)}>
      {icon}
      <span>{children}</span>
    </div>
  );
};
