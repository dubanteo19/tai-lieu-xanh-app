import { useAppSelector } from "@/hooks/useAppSelector";
import { ROUTES } from "@/routes/routes";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const SecureRoute: FC = () => {
  const { isLogin } = useAppSelector((state) => state.auth);
  return isLogin ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default SecureRoute;
