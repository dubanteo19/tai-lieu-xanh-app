import { Navigate, Outlet } from "react-router-dom";

const SecureRoute: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default SecureRoute;
