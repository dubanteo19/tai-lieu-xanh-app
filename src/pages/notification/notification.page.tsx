import {
  useGetAllNotficationsQuery,
  useMarkReadNotificaitonMutation,
} from "@/features/notification/api/notification.api";
import FullLoading from "@/shared/components/full-loading";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Button } from "@/shared/ui/button";

export const NotificationPage = () => {
  const { id: userId } = useAppSelector((state) => state.auth);
  const [markAsRead] = useMarkReadNotificaitonMutation();
  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markAsRead({ notificationId });
    } catch (error) {
      console.log(error);
    }
  };
  const {
    data: notifications,
    isLoading: loading,
    refetch,
    isFetching,
  } = useGetAllNotficationsQuery({ userId });
  if (loading) return <FullLoading />;
  if (!notifications?.length) return;
  <h5>Không có thông báo </h5>;
  return (
    <div>
      <h3>Trung tâm thông báo</h3>
      <Button
        onClick={refetch}
        disabled={isFetching}
        style={{ marginBottom: "1rem" }}
      >
        {isFetching ? "Đang làm mới dữ liệu..." : "Làm mới"}
      </Button>
      <div className="flex">
        {notifications?.map((notification) => (
          <div>
            <div>
              <div>
                <div>{notification.createdDate}</div>
              </div>
              <div>
                <div>{notification.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
