import {
  Box,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { useState } from "react";
import { ITagWithPost } from "../../api/adminMajorApi";
import { CenterCell } from "../post/ReviewPosts";
interface Props {
  tags: ITagWithPost[];
}
export const TagTable: React.FC<Props> = ({ tags }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#DA8042"];
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "tagName",
      headerName: "Tên nhãn",
      width: 240,
      renderCell: (params) => (
        <CenterCell>
          <Chip label={params.row.tagName}></Chip>
        </CenterCell>
      ),
    },
    {
      field: "posts",
      headerName: "Số tài liệu",
      width: 85,
    },
  ];
  const [top, setTop] = useState<number>(5);
  const data01 = tags.slice(0, top).map((tag) => ({
    name: tag.tagName,
    value: tag.posts,
  }));
  return (
    <Paper sx={{ px: 5, py: 2, mt: 2, height: 600 }}>
      <Stack direction="row" spacing={5}>
        <Box sx={{ height: 500, width: "45%" }}>
          <Stack direction={"row"} sx={{ mb: 2 }} alignItems="center">
            <Typography fontWeight="bold" variant="h5">
              Danh sách nhãn
            </Typography>
            <CheckCircleIcon sx={{ color: "green" }} />
          </Stack>
          <DataGrid rows={tags} columns={columns} />
        </Box>
        <Box
          sx={{
            height: 500,
            width: "55%",
          }}
        >
          <Stack direction={"row"} sx={{ mb: 2 }} alignItems="center">
            <Typography fontWeight="bold" variant="h5">
              Thống kê số lượt tài liệu theo nhãn
            </Typography>
          </Stack>
          <FormControl>
            <InputLabel id="report-reason-label">Top nhãn</InputLabel>
            <Select
              label="Top nhãn"
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
    </Paper>
  );
};
