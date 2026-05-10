import { Button } from "@/shared/ui/button";
import { ComponentProps, ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface LinkButtonProps extends ComponentProps<typeof Button> {
  children: ReactNode;
  href: string;
}
export const LinkButton = ({ children, href, ...prop }: LinkButtonProps) => {
  return (
    <Button asChild {...prop}>
      <NavLink to={href}>{children}</NavLink>
    </Button>
  );
};
