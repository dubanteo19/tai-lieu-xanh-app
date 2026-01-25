import { ImageHolder } from "@/shared/ui/image-holder";
interface FriendItemProps {
  id: number;
  fullName: string;
  avatar: string;
}
const FriendItem = ({ id, fullName, avatar }: FriendItemProps) => {
  return (
    <div>
      <div>
        <div>
          <ImageHolder src={avatar} />
        </div>
        <div>
          <p>{fullName}</p>
        </div>
        <div>MoreHorizIcon</div>
      </div>
    </div>
  );
};
const MyFriends = () => {
  const friendDetail = {
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    fullName: "Du Ban Teo",
    id: 1,
    likes: 10,
  };
  return (
    <div>
      <div>
        <div>
          <div>
            <h5>Danh sách bạn bè</h5>
            <p>100 người bạn</p>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
interface FriendDetailProps {
  friend: {
    id: number;
    fullName: string;
    avatar: string;
    likes: number;
  };
}
export const FriendDetail = ({ friend }: FriendDetailProps) => {
  return (
    <div>
      <div>
        <ImageHolder src="https://randomuser.me/api/portraits/women/10.jpg" />
        <p>{friend.fullName}</p>
      </div>
      <div>
        <div>
          <div>
            <p>Giới thiệu</p>
            <div>
              <div>
                ocalPhoneIcon
                <p>Số điện thoại: 0925821477</p>
              </div>
              <div>
                DownloadIcon
                <p>Lượt tải:10</p>
              </div>
              <div>
                ticleIcon /<p>Tổng số tài liệu :70</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyFriends;
