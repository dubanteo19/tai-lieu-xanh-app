import CountUp from "react-countup";
type Props = {
  title: string;
  total: number;
};
export function AnalyticsWidgetSummary({
  title,
  total,
  color = "primary",
}: Props) {
  return (
    <div>
      <div>
        <div>
          <div>{title}</div>
          <div>
            <CountUp start={0} end={total} duration={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
