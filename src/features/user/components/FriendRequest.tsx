import { friends } from "@/data/friends";
import { Button } from "@/shared/ui/button";
interface FriendRequestCardItemProps {
  id: number;
  fullName: string;
  avatar: string;
}
const FriendRequestCardItem = ({ fullName }: FriendRequestCardItemProps) => {
  return (
    <div>
      <p>{fullName}</p>
      <Button>Xác nhận</Button>
      <Button>Xoá</Button>
    </div>
  );
};
export const FriendRequest = () => {
  const friendRequests = friends;
  return (
    <div>
      <p>Yêu cầu kết bạn</p>
      <div>
        {friendRequests.map((friendRequest) => (
          <div>
            <FriendRequestCardItem
              key={friendRequest.id}
              {...friendRequest}
            ></FriendRequestCardItem>
          </div>
        ))}
      </div>
    </div>
  );
};
