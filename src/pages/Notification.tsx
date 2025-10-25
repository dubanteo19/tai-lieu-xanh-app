import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  useGetAllNotficationsQuery,
  useMarkReadNotificaitonMutation,
} from "../api/notificationApi";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import FullLoading from "../components/FullLoading";

export const NotificationPage = () => {
  const { id: userId } = useSelector((state: RootState) => state.auth);
  const [markAsRead] = useMarkReadNotificaitonMutation();
  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markAsRead({ notificationId });
    } catch (error) {}
    console.log(notificationId);
  };
  const {
    data: notifications,
    isLoading: loading,
    refetch,
    isFetching,
  } = useGetAllNotficationsQuery({ userId });
  return (
    <Box sx={{ p: 10 }}>
      {loading && <FullLoading />}
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Trung tâm thông báo
      </Typography>
      <Button
        variant="contained"
        sx={{ color: "white", fontWeight: "bold" }}
        onClick={refetch}
        disabled={isFetching} // Disable button while fetching
        style={{ marginBottom: "1rem" }}
      >
        {isFetching ? "Đang làm mới dữ liệu..." : "Làm mới"}
      </Button>
      {notifications?.length === 0 && (
        <Typography
          variant="h5"
          textAlign={"center"}
          color="text.secondary"
          mt={15}
        >
          Không có thông báo :(
        </Typography>
      )}
      <List>
        {notifications?.map((notification) => (
          <ListItem
            key={notification.id}
            sx={{
              borderRadius: 3,
              backgroundColor:
                notification.status === "UNREAD" ? "#ffecb3" : "#e0e0e0",
              padding: "16px",
              mb: 1,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Grid container alignItems="center" spacing={2}>
              {/* ID Column */}
              <Grid item xs={2}>
                <Typography variant="body2" color="text.secondary">
                  {notification.createdDate}
                </Typography>
              </Grid>
              {/* Content Column */}
              <Grid item xs={8}>
                <ListItemText
                  primary={notification.content}
                  secondary={
                    notification.status === "UNREAD" ? "Chưa đọc" : "Đã đọc"
                  }
                />
              </Grid>
              {/* Action Column */}
              {notification.status === "UNREAD" && (
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleMarkAsRead(notification.id)}
                    size="small"
                  >
                    Đánh dấu đã đọc
                  </Button>
                </Grid>
              )}
            </Grid>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
