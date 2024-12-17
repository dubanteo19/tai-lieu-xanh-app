import { forwardRef } from "react";

import Box, { BoxProps } from "@mui/material/Box";

type SvgColorProps = BoxProps & {
  src: string;
};

export const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
  ({ src, width = 24, height, sx }, ref) => (
    <Box
      ref={ref}
      component="span"
      sx={{
        width,
        flexShrink: 0,
        height: height ?? width,
        display: "inline-flex",
        bgcolor: "currentColor",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  ),
);
