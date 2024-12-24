import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLoginMutation } from "../api/authApi";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import FullLoading from "../components/FullLoading";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const notify = withReactContent(Swal);
  const [login, { data, isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  var messgae = location.state?.message;
  const handleLogin = async () => {
    try {
      const res = await login({ email: email, password: password }).unwrap();
      if (res.status === "inactive") {
        notify.fire({
          icon: "error",
          title: "Thông báo",
          text: "Tài khoản chưa kích hoạt. Vui liệu kích hoạt tài khoản trên email.",
          showConfirmButton: true,
        });
        return;
      }
      console.log(res);
      dispatch(
        setAccessToken({
          ...res,
        }),
      );
      dispatch(setRefreshToken(res?.refreshToken));
      navigate("/user");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Paper sx={{ pt: 10 }}>
      {isLoading && <FullLoading />}
      <Typography textAlign="center" variant="h4">
        Đăng nhập
      </Typography>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <Stack width={400} spacing={2}>
          <TextField
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            type="email"
            label="Email"
          />
          <TextField
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Mật khẩu"
            type="password"
          />
          <Button variant="contained" color="success" onClick={handleLogin}>
            Đăng nhập
          </Button>
          {error && (
            <Typography textAlign="center" variant="subtitle1" color="error">
              Thông tin đăng nhập không chính xác
            </Typography>
          )}
          {messgae && (
            <Typography textAlign="center" variant="subtitle1" color="success">
              {messgae}
            </Typography>
          )}
          <Typography textAlign="center">Chưa có tài khoản?</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                navigate("/register");
              }}
              sx={{ width: "50%", color: "white" }}
              color="info"
              variant="contained"
            >
              Đăng ký
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Paper>
  );
};
