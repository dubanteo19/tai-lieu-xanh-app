import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "../../components/SearchBar";
import { MajorTable } from "../components/major/MajorTable";
export const MajorManager = () => {
  const majors = [
    {
      id: 1,
      name: "Ngôn ngữ tiếng Anh",
      posts: 10,
    },
    {
      id: 2,
      posts: 3,
      name: "Nong hoc",
    },
  ];
  return (
    <Stack sx={{ px: 4 }}>
      <Typography fontWeight="bold" variant="h5">
        Quản lý danh mục tài liệu
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
            Danh mục tài liệu mới
          </Button>
        </Stack>
      </Stack>
      <MajorTable majors={majors} />
    </Stack>
  );
};
