import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import BarChartIcon from "@mui/icons-material/BarChart";
interface Major {
  id: number;
  name: string;
}
interface Props {
  majors: Major[];
}
export const MajorTable: React.FC<Props> = ({ majors }) => {
  const data01 = [
    { name: "Cong nghe thong tin", value: 400 },
    { name: "Kinh Te", value: 300 },
    { name: "Cong nghe hoa hoc", value: 300 },
    { name: "Thu Y", value: 200 },
    { name: "Nong hoc", value: 500 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#DA8042"];
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "name",
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
      renderCell: () => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary">
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
  return (
    <Paper sx={{ px: 5, py: 2, mt: 2, height: 600 }}>
      <Stack direction="row" spacing={5}>
        <Box sx={{ height: 500, width: "45%" }}>
          <Stack direction={"row"} sx={{ mb: 2 }} alignItems="center">
            <Typography fontWeight="bold" variant="h5">
              Danh mục dang hoat dong
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
              Thong ke so luot tai lieu theo danh muc
            </Typography>
            <BarChartIcon sx={{ color: "green" }} />
          </Stack>
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
    </Paper>
  );
};
