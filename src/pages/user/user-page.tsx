import ChangePassword from "@/features/user/components/ChangePassword";
import MyComments from "@/features/user/components/MyComments";
import MyFriends from "@/features/user/components/MyFriends";
import MyPosts from "@/features/user/components/MyPosts";
import { UserProfile } from "@/features/user/components/UserProfile";
import { UserProfileUpdate } from "@/features/user/components/UserProfileUpdate";
import UserSpeedDial from "@/features/user/components/UserSpeedDial";
import { USER_COMPONENTS, UserComponent } from "@/features/user/constants";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
const COMPONENT_MAP: Record<UserComponent, JSX.Element> = {
  [USER_COMPONENTS.UserProfile]: <UserProfile />,
  [USER_COMPONENTS.UserProfileUpdate]: <UserProfileUpdate />,
  [USER_COMPONENTS.MyPosts]: <MyPosts />,
  [USER_COMPONENTS.MyFriends]: <MyFriends />,
  [USER_COMPONENTS.ChangePassword]: <ChangePassword />,
  [USER_COMPONENTS.MyComments]: <MyComments />,
};
export const UserPage = () => {
  const selectedComponent = useAppSelector(
    (state) => state.userMenu.selectedComponent,
  );
  return (
    <div className="grid grid-cols-12 gap-4 w-full  py-6">
      <div className="col-span-3">
        <UserSpeedDial />
      </div>
      <div className="col-span-9">{COMPONENT_MAP[selectedComponent]}</div>
    </div>
  );
};
