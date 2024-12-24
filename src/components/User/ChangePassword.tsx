import React, { MouseEvent, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
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
const ChangePassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({
    message: "",
    status: "success",
  });
  const { id } = useSelector((state: RootState) => state.auth);
  const [updatePassword, { isLoading, isError }] = useUpdatePasswordMutation();
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage({
        message: "Mật khẩu xác nhận không khớp nhau",
        status: "error",
      });
      return;
    }
    const form: IUserUpdatePassword = {
      id,
      password: oldPassword,
      newPassword: newPassword,
    };
    try {
      await updatePassword(form).unwrap();
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

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Container sx={{ minHeight: 320, width: 800 }}>
      {isLoading && <FullLoading />}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 4 }}>
          Đổi mật khẩu
        </Typography>
        <form>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="old-password">Mật khẩu cũ</InputLabel>
            <OutlinedInput
              id="old-password"
              required
              type={showPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
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
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="new-password">Mật khẩu mới</InputLabel>
            <OutlinedInput
              id="new-password"
              required
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="confirm-password">
              Xác nhận mật khẩu mới
            </InputLabel>
            <OutlinedInput
              id="confirm-password"
              required
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          </FormControl>
          <Typography textAlign={"center"} color={message.status}>
            {message.message}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <Button
              onClick={() => handleChangePassword()}
              variant="contained"
              color="success"
              sx={{ marginRight: 2 }}
            >
              Đổi mật khẩu
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePassword;
