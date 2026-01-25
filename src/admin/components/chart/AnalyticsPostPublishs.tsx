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
  useGetPostCountsLastNDaysQuery,
} from "../../api/dashboardApi";

interface AnalyticsPostPublishsProps {
  title: string;
  subheader: string;
}
export const AnalyticsPostPublishs = ({
  title,
  subheader,
}: AnalyticsPostPublishsProps) => {
  const { data: postCounts } = useGetPostCountsLastNDaysQuery(10);
  const data = postCounts?.map((res: StatsCount) => {
    return {
      name: res.date,
      posts: res.count,
    };
  });
  return (
    <div>
      <h5>{title}</h5>
      <p>{subheader}</p>
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
          dataKey="posts"
          name="Tài liệu"
          stroke="#88884d"
        />
      </LineChart>
    </div>
  );
};
