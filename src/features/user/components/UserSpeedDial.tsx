import { logout } from "@/features/auth/authSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Divider } from "@/shared/ui/divider";
import {
  BookOpenCheckIcon,
  LockIcon,
  LogOutIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";
import { USER_COMPONENTS, UserComponent } from "../constants";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { setSlectedComponent } from "@/features/user-menu/userMenuSlice";
import { Button } from "@/shared/ui/button";

interface UserMenu {
  component: UserComponent;
  icon: LucideIcon;
  text: string;
}
const userMenus: UserMenu[] = [
  {
    icon: UserIcon,
    component: USER_COMPONENTS.UserProfile,
    text: "Thông tin",
  },
  {
    icon: BookOpenCheckIcon,
    component: USER_COMPONENTS.MyPosts,
    text: "Bài viết",
  },
  {
    icon: UserIcon,
    component: USER_COMPONENTS.MyFriends,
    text: "Bạn bè",
  },
  {
    icon: LockIcon,
    component: USER_COMPONENTS.ChangePassword,
    text: "Đổi mật khẩu",
  },
];
const UserSpeedDial = () => {
  const dispatch = useDispatch();
  const fullName = useAppSelector((state) => state.auth.userSummary?.fullName);
  const { selectedComponent } = useAppSelector((state) => state.userMenu);
  const onComponentChange = (componentName: UserComponent) => {
    dispatch(setSlectedComponent(componentName));
  };
  return (
    <div className="px-6 py-4 border bg-primary rounded-2xl text-white">
      <h5>
        Xin chào <strong>{fullName}</strong> !
      </h5>
      <nav className="flex flex-col gap-4 mt-4">
        {userMenus.map(({ icon: Icon, text, component }) => {
          const isActive = component == selectedComponent;
          return (
            <div
              className={cn(
                "flex items-center gap-2 transition cursor-pointer p-4 rounded-t ",
                "hover:bg-white/10",
                isActive && "bg-white hover:bg-white text-primary shadow-md",
              )}
              key={component}
              onClick={() => onComponentChange(component)}
            >
              <Icon />
              <p>{text}</p>
            </div>
          );
        })}
      </nav>
      <Divider color="white" className="my-4" />
      <Button variant="secon" onClick={() => dispatch(logout())}>
        <LogOutIcon size={20} />
        <span>Đăng xuất</span>
      </Button>
    </div>
  );
};

export default UserSpeedDial;
