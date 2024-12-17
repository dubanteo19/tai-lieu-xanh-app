import { Box, ListItem, ListItemButton, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import AnalyticsIcon from "@mui/icons-material/Analytics";
interface NavContentProps {
  data: {
    title: string;
    path: string;
    icon: any;
  }[];
}
export const NavContent: React.FC<NavContentProps> = ({ data }) => {
  const pathname = useLocation().pathname;
  return (
    <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column">
      <Box
        component="ul"
        gap={0.5}
        display="flex"
        sx={{ px: 1 }}
        flexDirection="column"
      >
        <Typography
          variant="h5"
          sx={{ py: 1, px: 2 }}
          color="primary.main"
          fontWeight={"bold"}
          textAlign={"center"}
        >
          Tài liệu xanh
        </Typography>
        {data.map((item) => {
          const isActived = item.path === pathname;
          return (
            <ListItem disableGutters disablePadding key={item.title}>
              <ListItemButton
                disableGutters
                href={item.path}
                sx={{
                  py: 1,
                  gap: 2,
                  px: 2,
                  pr: 1.5,
                  borderRadius: 0.75,
                  typography: "body2",
                  fontWeight: "fontWeightMedium",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                  color: "grey",
                  ...(isActived && {
                    fontWeight: "fontWeightSemiBold",
                    bgcolor: "primary.main",
                    color: "white",
                  }),
                }}
              >
                <Box sx={{ width: 24, height: 24 }}>{<item.icon />}</Box>

                <Box component="span" flexGrow={1}>
                  {item.title}
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })}
      </Box>
    </Box>
  );
};
