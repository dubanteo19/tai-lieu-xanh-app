import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "../../components/SearchBar";
import { MajorTable } from "../components/major/MajorTable";
import FullLoading from "../../components/FullLoading";
import { useState } from "react";
import { useCreateMajorMutation, useGetMajorsWithPostsQuery } from "../api/adminMajorApi";
import { toast } from "react-toastify";
export const MajorManager = () => {
  const { data: majors, isLoading } = useGetMajorsWithPostsQuery();
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const [createMajor, { isLoading: isCreating }] = useCreateMajorMutation();
  const [majorName, setMajorName] = useState<string>("");
  const handleCreateMajor = async () => {
    try {
      await createMajor({ name: majorName });
      toast.success("Tạo danh mục ngành tài liệu thành công", {});
      setMajorName("");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack sx={{ px: 4 }}>
      {isLoading && <FullLoading />}
      <Typography fontWeight="bold" variant="h5">
        Quản lý danh mục ngành tài liệu
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
            onClick={handleClickOpen}
            sx={{ color: "white", fontWeight: "bold" }}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Danh mục ngành tài liệu mới
          </Button>
          {/* NewMjaor Dialog */}
          <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle textAlign={"center"}>Tạo danh mục ngành</DialogTitle>
            <DialogContent sx={{ p: 5, width: "400px" }}>
              <TextField
                sx={{ mt: 2 }}
                value={majorName}
                onChange={(e) => setMajorName(e.target.value)}
                fullWidth
                label="Tên ngành"
              ></TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Hủy
              </Button>
              <Button
                onClick={() => {
                  handleCreateMajor();
                }}
                color="success"
                variant="contained"
                disabled={isCreating}
              >
                {isCreating ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Tạo"
                )}
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Stack>
      {majors && <MajorTable majors={majors} />}
    </Stack>
  );
};
