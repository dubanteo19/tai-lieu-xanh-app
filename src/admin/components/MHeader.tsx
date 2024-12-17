import { Box, Typography } from "@mui/material";
import { NotificationsPopover } from "./NotificationsPopover";
import { AccountPopover } from "./AccountPopover";
export const MHeader = () => {
  const notifications = [
    {
      id: "1",
      type: "notification",
      title: "Notification title",
      isUnRead: true,
      description: "This is the description",
      avatarUrl: null,
      postedAt: null,
    },
  ];
  return (
    <Box display="flex" sx={{ px: 3, py: 1 }} justifyContent="flex-end">
      <NotificationsPopover data={notifications} />
      <AccountPopover
        data={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Profile",
            href: "#",
          },
          {
            label: "Settings",
            href: "#",
          },
        ]}
      />
    </Box>
  );
};
