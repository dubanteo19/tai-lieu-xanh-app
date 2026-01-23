import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useVerifyMutation } from "../api/auth.api";
export const VerifyForm = () => {
  const [verify, { data, error, isLoading }] = useVerifyMutation();
  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      if (token) {
        await verify(token).unwrap();
      }
    };
    verifyEmail();
  }, [verify]);
  return (
    <div>
      <p>Kích hoạt tài khoản</p>
      {isLoading && <p>Đang kích hoạt tài khoản</p>}
      {error && <h6>Đã xảy ra lới khi kích hoạt tài khoản</h6>}
      {data && (
        <div>
          <h5>Kích hoạt tài khoản thành công</h5>
          <h6>
            Vui lòng đăng nhập vào hệ thống hoặc nhấn vào
            <NavLink to="/login"> liên kết này</NavLink> để chuyển hướng đến
            trang đăng nhập
          </h6>
        </div>
      )}
    </div>
  );
};
