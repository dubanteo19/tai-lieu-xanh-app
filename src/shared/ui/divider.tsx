import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  size?: number;
  color?: string;
}
export const Divider = ({
  size = 2,
  color = "primary",
  className,
}: DividerProps) => {
  return (
    <div
      className={cn(`w-full px-10`, className)}
      style={{ height: size, background: color }}
    />
  );
};
