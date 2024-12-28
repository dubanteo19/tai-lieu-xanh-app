import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PolicyIcon from "@mui/icons-material/Policy";
import FlagIcon from "@mui/icons-material/Flag";
import SearchBar from "../../components/SearchBar";
import { PostTable } from "../components/post/PostTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
export const PostManager = () => {
  const navigate = useNavigate();
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
            onClick={() => navigate("deleted-posts")}
            sx={{ fontWeight: "bold" }}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Tài liệu bị xóa
          </Button>
          <Button
            sx={{ color: "white", position: "relative", fontWeight: "bold" }}
            color="warning"
            variant="contained"
            onClick={() => navigate("review-posts")}
            startIcon={<PolicyIcon />}
          >
            Duyệt tài liệu
          </Button>
          <Button
            sx={{ color: "white", position: "relative", fontWeight: "bold" }}
            color="error"
            variant="contained"
            onClick={() => navigate("report-posts")}
            startIcon={<FlagIcon />}
          >
            Tài liệu bị báo cáo
          </Button>
        </Stack>
      </Stack>
      <PostTable />
    </Stack>
  );
};
