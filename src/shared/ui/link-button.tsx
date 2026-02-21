import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { underline } from "@/system-design/token/underline";

interface LinkButtonProp {
  to: string;
  className?: string;
  children: ReactNode;
}
export const LinkButton = ({ to, className, children }: LinkButtonProp) => {
  return (
    <NavLink className={"relative"} to={to}>
      {({ isActive }) => (
        <Button
          variant={"default"}
          asChild
          className={cn(
            "transition-all text-white",
            underline.base,
            underline.hover,
            isActive && underline.active,
            className,
          )}
        >
          <span>{children}</span>
        </Button>
      )}
    </NavLink>
  );
};
