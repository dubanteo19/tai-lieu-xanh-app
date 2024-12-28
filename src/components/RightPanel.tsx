import { Box, keyframes, Stack, Typography } from "@mui/material";
import { NewDocument, TopDocument } from "./TopDocument";
// Background gradient animation
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Text fade-in and slide-up animation
const textEntrance = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Banner = () => {
  return (
    <Box
      sx={{
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
        padding: 5,
        color: "white",
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(90deg, #9ccc65, #7aca35, #9ccc65)", // Green gradient
        backgroundSize: "200% 200%",
        animation: `${gradientAnimation} 6s ease infinite`,
      }}
    >
      <Typography
        fontSize={20}
        variant="subtitle1"
        sx={{
          animation: `${textEntrance} 1s ease both`,
          textAlign: "center",
        }}
      >
        <Typography
          color="white"
          variant="h4"
          textAlign="center"
          fontWeight={"bold"}
          sx={{
            animation: `${textEntrance} 1.5s ease both`,
          }}
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
    <Stack spacing={1} mt={3} position="sticky" top="70px" alignSelf="start">
      <TopDocument />
      <NewDocument />
    </Stack>
  );
};
export default RightPanel;
