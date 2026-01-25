import { setSlectedComponent } from "@/features/user-menu/userMenuSlice";
import ChangePassword from "@/features/user/components/ChangePassword";
import { FriendRequest } from "@/features/user/components/FriendRequest";
import MyComments from "@/features/user/components/MyComments";
import MyFriends from "@/features/user/components/MyFriends";
import MyPosts from "@/features/user/components/MyPosts";
import { UserProfile } from "@/features/user/components/UserProfile";
import { UserProfileUpdate } from "@/features/user/components/UserProfileUpdate";
import UserSpeedDial from "@/features/user/components/UserSpeedDial";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useDispatch } from "react-redux";
export const UserPage = () => {
  const selectedComponent = useAppSelector(
    (state) => state.userMenu.selectedComponent,
  );
  const dispatch = useDispatch();
  const handleComponentChange = (componentName: string) => {
    dispatch(setSlectedComponent(componentName));
  };
  return (
    <div>
      <div>
        <div>
          <div>
            <UserSpeedDial onComponentChange={handleComponentChange} />
          </div>
          <div>
            {selectedComponent === "UserProfile" && <UserProfile />}
            {selectedComponent === "UserProfileUpdate" && <UserProfileUpdate />}
            {selectedComponent === "MyPosts" && <MyPosts />}
            {selectedComponent === "MyFriends" && <MyFriends />}
            {selectedComponent === "FriendRequest" && <FriendRequest />}
            {selectedComponent === "ChangePassword" && <ChangePassword />}
            {selectedComponent === "MyComments" && <MyComments />}
          </div>
        </div>
      </div>
    </div>
  );
};
