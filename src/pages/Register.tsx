import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterReq, useRegisterMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import FullLoading from "../components/FullLoading";
import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin } from "@react-oauth/google";
export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterReq & { confirmPassword: string }>();
  const [registerAccount, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const handleRegister: SubmitHandler<IRegisterReq> = async (data) => {
    try {
      const res = await registerAccount(data).unwrap();
      if (res.email) {
        navigate("/login", {
          state: {
            message:
              "Đăng ký tài khoản thành công, vui lòng kích hoạt tài khoản trên email của tài khoản",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const password = watch("password");
  return (
    <Stack sx={{ pt: 2 }}>
      <Typography></Typography>
      <Typography textAlign="center" variant="h4">
        Đăng ký tài khoản
      </Typography>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          width={400}
          spacing={2}
          component="form"
          onSubmit={handleSubmit(handleRegister)}
        >
          <TextField
            label="Địa chỉ email"
            {...register("email", {
              required: "Vui lòng nhập email",
              minLength: {
                value: 4,
                message: "email phải nhất 6 ký tự",
              },
            })}
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message || null}
          />
          <TextField
            label="Họ và tên"
            {...register("fullName", {
              required: "Vui lòng nhập họ và tên",
              minLength: {
                value: 4,
                message: "Họ và tên phải nhất 4 ký tự",
              },
            })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message || null}
          />
          <TextField
            {...register("password", {
              required: "Vui lòng nhập mật khẩu ",
              minLength: {
                value: 6,
                message: "Mật khẩu phải nhất 6 ký tự",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message || null}
            placeholder="Mật khẩu"
            type="password"
          />
          <TextField
            {...register("confirmPassword", {
              required: "Vui lòng xác nhận mật khẩu ",
              validate: (value) => value === password || "Mật khẩu không khợp",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message || null}
            type="password"
            placeholder="Xác nhận mật khẩu"
          />
          {error && <Typography color="error">Email này đã tồn tại</Typography>}
          <Button type="submit" variant="contained" color="success">
            Đăng ký
          </Button>
          {isLoading && <FullLoading />}
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleLoginWithGoogle();
            }}
            startIcon={<GoogleIcon />}
            sx={{ flex: 1, ml: 1 }}
          >
            Google
          </Button>

          <Typography textAlign="center">Đã có tài khoản?</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              sx={{ width: "50%", color: "white" }}
              color="info"
              variant="contained"
            >
              Đăng nhập
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
