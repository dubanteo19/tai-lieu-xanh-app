import { Badge, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PolicyIcon from "@mui/icons-material/Policy";
import FlagIcon from "@mui/icons-material/Flag";
import SearchBar from "../../components/SearchBar";
import { PostTable } from "../components/post/PostTable";
export const PostManager = () => {
  return (
    <Stack sx={{ px: 4 }}>
      <Typography fontWeight="bold" variant="h5">
        Quản lý tài liệu
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
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ color: "white", fontWeight: "bold" }}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Tài liệu mới
          </Button>
          <Button
            sx={{ color: "white", position: "relative", fontWeight: "bold" }}
            color="warning"
            variant="contained"
            startIcon={<PolicyIcon />}
          >
            Duyệt tài liệu
            <Badge
              sx={{
                position: "absolute",
                right: 0,
                top: 5,
                "& .MuiBadge-badge": {
                  fontSize: 15,
                  minWidth: 25,
                  height: 25,
                },
              }}
              color="error"
              badgeContent={2}
            />
          </Button>
          <Button
            sx={{ color: "white", position: "relative", fontWeight: "bold" }}
            color="error"
            variant="contained"
            startIcon={<FlagIcon />}
          >
            Tài liệu bị báo cáo
            <Badge
              sx={{
                position: "absolute",
                right: 0,
                top: 5,
                "& .MuiBadge-badge": {
                  fontSize: 15,
                  minWidth: 25,
                  height: 25,
                },
              }}
              color="warning"
              badgeContent={9}
            />
          </Button>
        </Stack>
      </Stack>
      <PostTable />
    </Stack>
  );
};
