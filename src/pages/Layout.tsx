import { Box } from "@mui/material";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ flex: "0 0 auto", height: 60 }}>
        <Header />
      </Box>
      <Box sx={{ flex: "1 1 auto" }}>
        <Outlet />
      </Box>
      <Box
        sx={{
          flex: "0 0 auto",
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};
