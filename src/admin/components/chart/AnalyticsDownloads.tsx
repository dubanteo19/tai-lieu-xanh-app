import { Paper, Typography } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
} from "recharts";
import {
  StatsCount,
  useGetDownloadsCountsLastNDaysQuery,
} from "../../api/dashboardApi";

interface AnalyticsPostPublishsProps {
  title: string;
  subheader: string;
}
export const AnalyticsDownloadsPublishs: React.FC<
  AnalyticsPostPublishsProps
> = ({ title, subheader }) => {
  const { data: downloadCounts } = useGetDownloadsCountsLastNDaysQuery(10);
  const data = downloadCounts?.map((res: StatsCount) => {
    return {
      name: res.date,
      downloads: res.count,
    };
  });
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
        <Line
          type="monotone"
          dataKey="downloads"
          name="Lượt tải"
          stroke="#8884d8"
        />
      </LineChart>
    </Paper>
  );
};
