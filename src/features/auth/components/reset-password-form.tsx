import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useResetMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import FullLoading from "../components/FullLoading";
export const ResetPassword = () => {
  interface IRestPassword {
    password: string;
    token: string;
    confirmPassword: string;
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRestPassword>();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const [resetPassword, { isLoading }] = useResetMutation();
  const navigate = useNavigate();
  const password = watch("password");
  const handleResetPassword: SubmitHandler<IRestPassword> = async (data) => {
    try {
      await resetPassword({
        token: data.token,
        password: data.password,
      });
      navigate("/login", {
        state: {
          message:
            "Khôi phục mật khẩu thành công, vui lòng đăng nhập tài khoản",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(handleResetPassword)}
      sx={{ pt: 10 }}
    >
      {isLoading && <FullLoading />}
      <Typography textAlign="center" variant="h4">
        Khôi phục mật khẩu
      </Typography>

      <Typography textAlign="center" color="text.secondary" variant="subtitle1">
        Nếu như bạn quên mật khẩu đăng nhập!
      </Typography>
      <Typography textAlign="center" color="text.secondary" variant="subtitle1">
        Vui lòng email đã đăng ký để thực hiện khôi phục mật khẩu
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
            {...register("password", { required: "Vui lòng nhập mật khẩu" })}
            error={!!errors.password}
            helperText={errors.password?.message || null}
            type="password"
            label="Mật khẩu"
          />
          <TextField
            {...register("confirmPassword", {
              required: "Vui lòng nhập email",
              validate: (value) => value === password || "Mật khẩu không khợp",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message || null}
            type="password"
            label="Nhập lặp mật khẩu"
          />
          <TextField
            {...register("token")}
            sx={{ display: "none" }}
            value={token}
          />
          <Button variant="contained" color="success" type="submit">
            Khôi phục mật khẩu
          </Button>
        </Stack>
      </Paper>
    </Paper>
  );
};
