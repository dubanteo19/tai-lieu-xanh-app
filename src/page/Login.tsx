import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";



export const Login = () => {
  return (
    <Paper sx={{ pt: 10 }}>

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
          <TextField label="Tên đăng nhập" />
          <TextField placeholder="Mật khẩu" type="password" />
          <Button variant="contained">Đăng nhập</Button>
          <Typography textAlign="center">Chưa có tài khoản?</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
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
