import type { CardProps } from "@mui/material/Card";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { SvgColor } from "./SvgColor";
import { getColor } from "../utils/getColor";
import CountUp from "react-countup";
type Props = CardProps & {
  title: string;
  total: number;
  icon: React.ReactNode;
};
export function AnalyticsWidgetSummary({
  icon,
  title,
  total,
  color = "primary",
}: Props) {
  const gradient = getColor(color);
  return (
    <Card
      sx={{
        p: 3,
        background: `linear-gradient(135deg, ${gradient?.main} 0%, ${gradient?.darker} 100%)`,
        boxShadow: "none",
        position: "relative",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          position: "relative",
          mb: 3,
          zIndex: 999,
        }}
        color={gradient?.icon}
      >
        {icon}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          zIndex: 2,
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 112 }}>
          <Box sx={{ mb: 1, typography: "subtitle2", fontWeight: "bold" }}>
            {title}
          </Box>
          <Box sx={{ typography: "h4" }} fontWeight="bold">
            <CountUp
              start={0}
              end={total}
              duration={2.5} // Adjust duration for animation speed
            />
          </Box>
        </Box>
      </Box>
      <SvgColor
        src={"/assets/background/shape-square.svg"}
        sx={{
          top: 0,
          left: -20,
          width: 240,
          zIndex: 1,
          height: 240,
          opacity: 0.9,
          position: "absolute",
          color: gradient?.svg,
        }}
      />
    </Card>
  );
}
