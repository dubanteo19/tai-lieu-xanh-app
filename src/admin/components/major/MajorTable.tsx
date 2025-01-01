import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import BarChartIcon from "@mui/icons-material/BarChart";
import { IMajorWithPost } from "../../../api/postApi";
import { useState } from "react";
import { useUpdateMajorMutation } from "../../api/adminMajorApi";
import { toast } from "react-toastify";
interface Props {
  majors: IMajorWithPost[];
}
export const MajorTable: React.FC<Props> = ({ majors }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#DA8042"];
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "majorName",
      headerName: "Tên danh mục",
      width: 240,
    },
    {
      field: "posts",
      headerName: "Số tài liệu",
      width: 85,
    },
    {
      field: "actions",
      headerName: "Chức năng",
      width: 100,
      renderCell: (param) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => {
              handleClickOpen();
              setMajorName(param.row.majorName);
              setMajorId(param.row.id);
            }}
            size="small"
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleUpdateMajor = async () => {
    try {
      await updateMajor({ majorId, name: majorName });
      handleClose();
      toast.success("Cập nhật danh mục ngành thành công", {});
    } catch (error) {
      console.log(error);
    }
  };
  const [updateMajor, { isLoading: isCreating }] = useUpdateMajorMutation();
  const [majorName, setMajorName] = useState<string>("");
  const [majorId, setMajorId] = useState<number>(0);
  const [top, setTop] = useState<number>(5);
  const data01 = majors.slice(0, top).map((major) => ({
    name: major.majorName,
    value: major.posts,
  }));
  return (
    <Paper sx={{ px: 5, py: 2, mt: 2, height: 600 }}>
      <Stack direction="row" spacing={5}>
        <Box sx={{ height: 500, width: "45%" }}>
          <Stack direction={"row"} sx={{ mb: 2 }} alignItems="center">
            <Typography fontWeight="bold" variant="h5">
              Danh sách danh mục tài liệu
            </Typography>
            <CheckCircleIcon sx={{ color: "green" }} />
          </Stack>
          <DataGrid rows={majors} columns={columns} />
        </Box>
        <Box
          sx={{
            height: 500,
            width: "55%",
          }}
        >
          <Stack direction={"row"} sx={{ mb: 2 }} alignItems="center">
            <Typography fontWeight="bold" variant="h5">
              Thống kê số lượt tài liệu theo danh mục ngành
            </Typography>
          </Stack>
          <FormControl>
            <InputLabel id="report-reason-label">Top ngành</InputLabel>
            <Select
              label="Top ngành"
              labelId="top-major-label"
              sx={{ width: 100 }}
              value={top}
              onChange={(e) => setTop(Number(e.target.value))}
            >
              <MenuItem key={10} value={10}>
                10
              </MenuItem>
              <MenuItem key={5} value={5}>
                5
              </MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PieChart height={500} width={400}>
              <Legend />
              <Tooltip />
              <Pie data={data01} dataKey="value" fill="#8884d8" label>
                {data01.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </Box>
        </Box>
      </Stack>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle textAlign={"center"}>Cập nhập danh mục ngành</DialogTitle>
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
              handleUpdateMajor();
            }}
            color="success"
            variant="contained"
            disabled={isCreating}
          >
            {isCreating ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Lưu"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
