import { NavLink } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { FC, ReactNode } from "react";

interface LinkButtonProps {
  to: string;
  children: ReactNode;
}
export const LinkButton: FC<LinkButtonProps> = ({ to, children }) => {
  return (
    <NavLink to={to}>
      <Button>{children}</Button>
    </NavLink>
  );
};
