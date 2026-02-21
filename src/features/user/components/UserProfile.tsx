import { setSlectedComponent } from "@/features/user-menu/userMenuSlice";
import FullLoading from "@/shared/components/full-loading";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Button } from "@/shared/ui/button";
import { useDispatch } from "react-redux";
import { useGetInfoQuery } from "../api/user.api";
import { skipToken } from "@reduxjs/toolkit/query";
export const UserProfile = () => {
  const userId = useAppSelector((state) => state.auth.userSummary?.id);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetInfoQuery(userId ?? skipToken);
  if (isLoading) return <FullLoading />;
  return (
    <div className="flex-center w-full ">
      <div>
        <h2 className="text-center">Thông tin tài khoản</h2>
        <div>
          <div>Avatar</div>
        </div>
        <div>
          <div>
            <p>Tiểu sử:</p>
            <p>{data?.bio || "Chưa có tiểu sử"}</p>
          </div>
        </div>
        <div>
          <div>
            <div>
              accountCircleIcon /<p>Tên người dùng</p>
              {data?.fullName}
            </div>
          </div>
          <div>
            <div>
              EmailIcon
              <p>Email:</p>
            </div>
          </div>
          <div>
            <div>
              Diversity3Icon
              <p>Bạn bè</p>
            </div>
          </div>
          <div>
            <div>
              rticleIcon
              <p>Bài viết</p>
              <p>0</p>
            </div>
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
