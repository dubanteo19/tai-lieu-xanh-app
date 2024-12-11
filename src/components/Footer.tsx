import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Stack
      direction="row"
      sx={{
        bgcolor: "primary.main",
        mt: 2,
        justifyContent: "space-between",
        paddingY: 2,
        paddingX: 30,
      }}
    >
      <Typography>
        Tài liệu xanh @2024 nền tảng chia sẽ tài liệu cho học sinh viên
      </Typography>
      <Stack direction="row" spacing={3}>
        <Link to={""}>
          <Typography color="black" fontWeight="bold">
            Trang chủ
          </Typography>
        </Link>
        <Link to={""}>
          <Typography color="black" fontWeight="bold">
            Giới thiệu
          </Typography>
        </Link>
        <Link to={""}>
          <Typography color="black" fontWeight="bold">
            Quy định
          </Typography>
        </Link>
      </Stack>
    </Stack>
  );
};
