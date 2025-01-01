import React, { MouseEvent, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  FormHelperText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  IUserUpdatePassword,
  useUpdatePasswordMutation,
} from "../../api/userApi";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import FullLoading from "../FullLoading";
import { useForm, SubmitHandler } from "react-hook-form";
const ChangePassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    status: "success",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserUpdatePassword & { confirmPassword: string }>();
  const { id } = useSelector((state: RootState) => state.auth);
  const [updatePassword, { isLoading, isError }] = useUpdatePasswordMutation();
  const handleChangePassword: SubmitHandler<IUserUpdatePassword> = async (
    data,
  ) => {
    try {
      await updatePassword({
        id,
        password: data.password,
        newPassword: data.newPassword,
      }).unwrap();
      setMessage({
        message: "Đổi mật khẩu thành công",
        status: "success",
      });
    } catch (error) {
      setMessage({
        message: "Sai mật khẩu cũ",
        status: "error",
      });
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const newPassword = watch("newPassword");
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Container sx={{ minHeight: 320, width: 800 }}>
      {isLoading && <FullLoading />}
      <Box
        sx={{ marginTop: 4 }}
        component="form"
        onSubmit={handleSubmit(handleChangePassword)}
      >
        <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 4 }}>
          Đổi mật khẩu
        </Typography>
        <Box>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="old-password">Mật khẩu cũ</InputLabel>
            <OutlinedInput
              {...register("password", { required: "Vui lòng nhập mật khẩu " })}
              error={!!errors.password}
              id="old-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mật khẩu cũ"
            />
            <FormHelperText error id="accountId-error">
              {errors.password?.message || null}
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="new-password">Mật khẩu mới</InputLabel>
            <OutlinedInput
              id="new-password"
              {...register("newPassword", {
                required: "Vui lòng nhập mật khẩu mới",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải nhất 6 ký tự",
                },
              })}
              error={!!errors.newPassword}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mật khẩu mới"
            />
            <FormHelperText error>
              {errors.newPassword?.message || null}
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="confirm-password">
              Xác nhận mật khẩu mới
            </InputLabel>
            <OutlinedInput
              {...register("confirmPassword", {
                required: "Vui lòng nhập mật khẩu xác nhận",
                validate: (value) =>
                  value === newPassword || "Mật khẩu không khợp",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải nhất 6 ký tự",
                },
              })}
              error={!!errors.confirmPassword}
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Xác nhận mật khẩu mới"
            />
            <FormHelperText error>
              {errors.confirmPassword?.message || null}
            </FormHelperText>
          </FormControl>
          <Typography textAlign={"center"} color={message.status}>
            {message.message}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ marginRight: 2 }}
            >
              Đổi mật khẩu
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePassword;
