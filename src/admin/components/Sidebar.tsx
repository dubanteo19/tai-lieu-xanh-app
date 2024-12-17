import { Box } from "@mui/material";
import { NavContent } from "./NavContent";
import { navData } from "../data/navData";
export const Sidebar = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        position: "fixed",
        width: "15rem",
      }}
    >
      <NavContent data={navData} />
    </Box>
  );
};
