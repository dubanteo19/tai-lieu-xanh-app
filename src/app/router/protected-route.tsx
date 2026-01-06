import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
const SecureRoute: FC = () => {
  const { isLogin } = useAppSelector((state) => state.auth);
  return isLogin ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default SecureRoute;
