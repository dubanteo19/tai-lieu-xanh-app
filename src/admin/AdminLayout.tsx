import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { MHeader } from "./components/MHeader";
import { MFooter } from "./components/MFooter";
import Grid from "@mui/material/Grid2";

export const AdminLayout = () => {
  return (
    <Grid container>
      <Grid size={2}>
        <Sidebar />
      </Grid>
      <Grid
        sx={{
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
        }}
        size={10}
      >
        <MHeader />
        <Outlet />
        <MFooter />
      </Grid>
    </Grid>
  );
};
