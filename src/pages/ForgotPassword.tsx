import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
export const ForgotPassword = () => {
  const notify = withReactContent(Swal);
  interface IForgotReq {
    email: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotReq>();
  const location = useLocation();
  const { id } = useSelector((state: RootState) => state.auth);
  const handleForgotPassword: SubmitHandler<IForgotReq> = async (data) => {
    try {
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
      <Typography textAlign="center" variant="h4">
        Quên mật khẩu
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
          <Button variant="contained" color="success" type="submit">
            Đăng nhập
          </Button>
        </Stack>
      </Paper>
    </Paper>
  );
};
