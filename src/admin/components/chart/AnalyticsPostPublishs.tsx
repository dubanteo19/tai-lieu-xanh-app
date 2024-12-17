import { Paper, Typography } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
} from "recharts";

interface AnalyticsPostPublishsProps {
  title: string;
  subheader: string;
  data: {
    name: string;
    posts: number;
  }[];
}
export const AnalyticsPostPublishs: React.FC<AnalyticsPostPublishsProps> = ({
  title,
  subheader,
  data,
}) => {
  return (
    <Paper sx={{ px: 2, py: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        {subheader}
      </Typography>
      <LineChart
        width={1100}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        height={300}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="posts" stroke="#8884d8" />
      </LineChart>
    </Paper>
  );
};
