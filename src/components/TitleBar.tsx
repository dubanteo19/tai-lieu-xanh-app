import { Box, keyframes, Typography } from "@mui/material";
import React from "react";
interface TitleBarProps {
  text: string;
}

// Define spark animation
const sparkAnimation = keyframes`
  0% {
    left: -50%;
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
`;
export const TitleBar: React.FC<TitleBarProps> = ({ text }) => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        borderRadius: 2,
        overflow: "hidden", // Ensures the spark doesn't overflow outside the box
        position: "relative",
        paddingX: 5,
        paddingY: 0.5,
        color: "white",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "-50%", // Start position
          width: "50%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
          animation: `${sparkAnimation} 2s infinite`,
        }}
      />
      <Typography fontWeight="bold">{text}</Typography>
    </Box>
  );
};
