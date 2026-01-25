import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Button } from "@/shared/ui/button";
import { useDispatch } from "react-redux";
import { useGetInfoQuery } from "../api/user.api";
export const UserProfile = () => {
  const userId = useAppSelector((state) => state.auth.id);
  const { data, isLoading } = useGetInfoQuery(userId);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <p>Thông tin tài khoản</p>
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
