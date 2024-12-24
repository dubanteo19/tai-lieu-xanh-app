import { Box } from "@mui/material";
import React from "react";
import ReactLoading from "react-loading";
const FullLoading: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <ReactLoading type="spin" color="green" width={50} height={50} />
    </Box>
  );
};

export default FullLoading;
