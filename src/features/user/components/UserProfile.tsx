import { setSlectedComponent } from "@/features/user-menu/userMenuSlice";
import FullLoading from "@/shared/components/full-loading";
import { IconText } from "@/shared/components/icon-text";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Button } from "@/shared/ui/button";
import { ImageHolder } from "@/shared/ui/image-holder";
import { skipToken } from "@reduxjs/toolkit/query";
import { MailIcon, UserIcon, UsersIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useGetInfoQuery } from "../api/user.api";
export const UserProfile = () => {
  const userId = useAppSelector((state) => state.auth.userSummary?.id);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetInfoQuery(userId ?? skipToken);
  if (isLoading) return <FullLoading />;
  return (
    <div className="flex-center w-full ">
      <div>
        <h2 className="text-center">Thông tin tài khoản</h2>
        <div className="flex justify-center ">
          <ImageHolder className="size-20 rounded-full" src={data?.avatar} />
        </div>
        <div>
          <div className="bg-gray-200  rounded-xl min-h-20 p-2 ">
            <p>{data?.bio || "Chưa có tiểu sử"}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center ">
            <IconText icon={<UserIcon />}>Họ và tên: </IconText>
            <p>{data?.fullName}</p>
          </div>
          <div className="flex items-center">
            <IconText icon={<MailIcon />}>Email: </IconText>
            <p>{data?.email}</p>
          </div>
          <div className="flex items-center">
            <IconText icon={<UsersIcon />}>Tài liệu: </IconText>
            <p>{data?.posts || 0}</p>
          </div>
        </div>
        <div>
          <Button
            id="update-btn"
            onClick={() => dispatch(setSlectedComponent("UserProfileUpdate"))}
          >
            Cập nhật thông tin
          </Button>
        </div>
      </div>
    </div>
  );
};
