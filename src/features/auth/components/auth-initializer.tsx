import FullLoading from "@/shared/components/full-loading";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMeQuery } from "../api/auth.api";
import { clearAuth, setUser } from "../authSlice";

interface AuthInitilizerProps {
  children: ReactNode;
}
export const AuthInitilizer = ({ children }: AuthInitilizerProps) => {
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.auth.accessToken);
  const { data, isLoading, isError } = useMeQuery(undefined, { skip: !token });

  useEffect(() => {
    if (data && token) {
      dispatch(setUser(data));
    }
    if (isError) {
      dispatch(clearAuth());
    }
  }, [data, isError]);
  if (token && isLoading) return <FullLoading />;
  return children;
};
