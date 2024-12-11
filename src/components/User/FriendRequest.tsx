import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { friends } from "../../data/friends";
interface FriendRequestCardItemProps {
  id: number;
  fullName: string;
  avatar: string;
}
const FriendRequestCardItem: React.FC<FriendRequestCardItemProps> = (props) => {
  return (
    <Stack sx={{ padding: 2 }} spacing={1}>
      <Box
        component="img"
        src={props.avatar}
        sx={{ width: 200, height: 150 }}
      />
      <Typography fontWeight="bold" variant="body2" textAlign="center">
        {props.fullName}
      </Typography>
      <Button variant="contained" sx={{ color: "white", fontWeight: "bold" }}>
        Xác nhận
      </Button>
      <Button variant="contained" color="secondary" sx={{ color: "black", fontWeight: "bold" }}>
        Xoá
      </Button>
    </Stack>
  );
};
export const FriendRequest = () => {
  const friendRequests = friends;
  return (
    <Box sx={{ bgcolor: "secondary.main", padding: 2 }}>
      <Typography fontWeight="bold" variant="h6">
        Yêu cầu kết bạn
      </Typography>
      <Grid container spacing={2}>
        {friendRequests.map((friendRequest) => (
          <Grid size={3}>
            <FriendRequestCardItem
              key={friendRequest.id}
              {...friendRequest}
            ></FriendRequestCardItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
