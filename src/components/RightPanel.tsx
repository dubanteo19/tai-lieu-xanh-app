import { Box, Stack, Typography } from "@mui/material";
import { NewDocument, TopDocument } from "./TopDocument";

export const Banner = () => {
  return (
    <Box
      bgcolor="primary.main"
      sx={{
        height: 200,
        justifyContent: "center",
        borderRadius: 3,
        alignItems: "center",
        display: "flex",
        padding: 5,
        color: "white",
      }}
    >
      <Typography fontSize={20} variant="subtitle1">
        <Typography
          color="white"
          variant="h4"
          textAlign="center"
          fontWeight={"bold"}
        >
          Tài liệu xanh
        </Typography>
        Nơi cùng nhau kết nối & chia sẽ những tài liệu học tập cùng nhau bước
        qua những năm tháng học trò!
      </Typography>
    </Box>
  );
};
const RightPanel = () => {
  return (
    <Stack spacing={4} mt={3} position="sticky" top="70px" alignSelf="start">
      <TopDocument />
      <NewDocument />
    </Stack>
  );
};
export default RightPanel;
