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
        <strong>Tài liệu xanh</strong>- Nơi cùng nhau kết nối & chia sẽ những
        tài liệu học tập cùng nhau bước qua những năm tháng học trò!
      </Typography>
    </Box>
  );
};
const RightPanel = () => {
  return (
    <Stack position="sticky" top="70px" alignSelf="start" spacing={3}>
      <Banner />
      <TopDocument />
      <NewDocument />
    </Stack>
  );
};
export default RightPanel;
