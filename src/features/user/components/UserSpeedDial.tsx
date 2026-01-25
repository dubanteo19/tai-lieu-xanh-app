import { setSlectedComponent } from "@/features/user-menu/userMenuSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UserSpeedDialProps {
  onComponentChange: (componentName: string) => void;
}

const UserSpeedDial = ({ onComponentChange }: UserSpeedDialProps) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);

  const selectedComponent = useAppSelector(
    (state) => state.userMenu.selectedComponent,
  );

  const { fullName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleItemClick = (componentName: string) => {
    if (componentName !== "Friends") {
      dispatch(setSlectedComponent(componentName));
    }
    setOpenSubmenu((prev) => (componentName === "Friends" ? !prev : false));
  };

  useEffect(() => {
    onComponentChange(selectedComponent);
  }, [selectedComponent, onComponentChange]);
  return (
    <div>
      <div className="left">
        <div>
          <nav aria-label="main mailbox folders">
            <div>
              <div>
                Xin chào {fullName} <p> !</p>
              </div>
              <div>
                <div>
                  <div>AccountCircleIcon</div>
                  <p>Thông tin</p>
                </div>
              </div>
              <div>
                <div
                  onClick={() => handleItemClick("MyPosts")}
                  selected={selectedComponent === "MyPosts"}
                >
                  <idv>AssignmentIcon</idv>
                  <p>Bài viết</p>
                </div>
              </div>
              <div>
                <div
                  onClick={() => handleItemClick("MyComments")}
                  selected={selectedComponent === "MyComments"}
                >
                  <div>CommentIcon</div>
                  <p>Bình luận</p>
                </div>
              </div>
              <div>
                <div>
                  <div>PeopleIcon</div>
                  <p>Bạn bè - Đang phát triển</p>
                </div>
              </div>
              <div>
                <div>
                  <div
                    onClick={() => handleItemClick("MyFriends")}
                    selected={selectedComponent === "MyFriends"}
                  >
                    <p>Tất cả bạn bè</p>
                  </div>
                  <div
                    onClick={() => handleItemClick("FriendRequest")}
                    selected={selectedComponent === "FriendRequest"}
                  >
                    <p>Lời mời kết bạn</p>
                  </div>
                </div>
              </div>

              <div>
                <div
                  onClick={() => handleItemClick("ChangePassword")}
                  selected={selectedComponent === "ChangePassword"}
                >
                  <div>PasswordIcon</div>
                  <p>Đổi mật khẩu</p>
                </div>
              </div>
            </div>
          </nav>
          <Divider />
          <nav aria-label="secondary mailbox folders">
            <div>
              <div>
                <div onClick={() => dispatch(logout())}>
                  <p>Đăng xuất</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserSpeedDial;
