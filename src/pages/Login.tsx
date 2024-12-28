import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLoginMutation } from "../api/authApi";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import FullLoading from "../components/FullLoading";

import { SubmitHandler, useForm } from "react-hook-form";
export const Login = () => {
  const notify = withReactContent(Swal);
  interface ILoginReq {
    email: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginReq>();
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  var messgae = location.state?.message;
  const handleLogin: SubmitHandler<ILoginReq> = async (data) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      if (res.status === "inactive") {
        notify.fire({
          icon: "error",
          title: "Thông báo",
          text: "Tài khoản chưa kích hoạt. Vui liệu kích hoạt tài khoản trên email.",
          showConfirmButton: true,
        });
        return;
      }
      if (res.status === "ban") {
        notify.fire({
          icon: "error",
          title: "Thông báo",
          text: "Tài khoản đã bị đình chỉ",
          showConfirmButton: true,
        });
        return;
      }
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
    <Paper
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      sx={{ pt: 10 }}
    >
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
            {...register("email", { required: "Vui lòng nhập email" })}
            error={!!errors.email}
            helperText={errors.email?.message || null}
            type="email"
            label="Email"
          />
          <TextField
            {...register("password", { required: "Vui lòng nhập mật khẩu" })}
            error={!!errors.password}
            helperText={errors.password?.message || null}
            placeholder="Mật khẩu"
            type="password"
          />
          <Button variant="contained" color="success" type="submit">
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
