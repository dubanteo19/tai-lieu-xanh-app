import { Stack, Typography } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { UserTable } from "../components/user/UserTable";
export const UserManager = () => {
  return (
    <Stack sx={{ px: 4 }}>
      <Typography fontWeight="bold" variant="h5">
        Quản lý người dùng
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        bgcolor="white"
        sx={{ mt: 2, px: 4, py: 2, borderRadius: 2 }}
        justifyContent="space-between"
      >
        <Stack>
          <SearchBar color="primary.main" />
        </Stack>
      </Stack>
      <UserTable />
    </Stack>
  );
};
