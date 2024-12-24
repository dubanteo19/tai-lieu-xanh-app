import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useVerifyMutation } from "../api/authApi";
import { NavLink } from "react-router-dom";
const Verify = () => {
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
  }, []);
  return (
    <Box sx={{ p: 10 }}>
      <Typography textAlign={"center"} color="success" variant="h3">
        Kích hoạt tài khoản
      </Typography>
      {isLoading && (
        <Typography variant="h6">Đang kích hoạt tài khoản</Typography>
      )}
      {error && (
        <Typography variant="h6" color="error">
          Đã xảy ra lới khi kích hoạt tài khoản
        </Typography>
      )}
      {data && (
        <Box>
          <Typography variant="h5" color="info">
            Kích hoạt tài khoản thành công
          </Typography>
          <Typography variant="h6">
            Vui lòng đăng nhập vào hệ thống hoặc nhấn vào
            <NavLink
              to="/login"
              style={{
                color: "green",
              }}
            >
              {" "}
              liên kết này
            </NavLink>{" "}
            để chuyển hướng đến trang đăng nhập
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default Verify;
