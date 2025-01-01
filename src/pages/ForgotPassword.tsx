import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { SubmitHandler, useForm } from "react-hook-form";
import { useForgotMutation } from "../api/authApi";
import FullLoading from "../components/FullLoading";
export const ForgotPassword = () => {
  const notify = withReactContent(Swal);
  interface IForgotReq {
    email: string;
  }
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotReq>();
  const [forgotPassword, { isLoading, isError }] = useForgotMutation();
  const handleForgotPassword: SubmitHandler<IForgotReq> = async (data) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();
      notify.fire({
        icon: "success",
        title: "Thông báo",
        text: "Vui lòng kiểm tra email để khôi phục mật khẩu",
        showConfirmButton: true,
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(handleForgotPassword)}
      sx={{ pt: 10 }}
    >
      {isLoading && <FullLoading />}
      <Typography textAlign="center" variant="h4">
        Quên mật khẩu
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
            {...register("email", { required: "Vui lòng nhập email" })}
            error={!!errors.email}
            helperText={errors.email?.message || null}
            type="email"
            label="Email"
          />
          {isError && (
            <Typography color="error">
              Email không tồn tại
            </Typography>
          )}
          <Button variant="contained" color="success" type="submit">
            Khôi phục mật khẩu
          </Button>
        </Stack>
      </Paper>
    </Paper>
  );
};
