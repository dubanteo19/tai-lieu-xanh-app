import { useGetAllUnreadNotficationsQuery } from "@/api/notificationApi";
import SearchBar from "@/components/SearchBar";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ROUTES } from "@/routes/routes";
import { getThumbUri } from "@/utils/uri";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { skipToken } from "@reduxjs/toolkit/query";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
const Header = () => {
  const navigate = useNavigate();
  const { isLogin, id, fullName, avatar } = useAppSelector(
    (state) => state.auth,
  );
  const favorite = useAppSelector((state) => state.favorite);
  const { data: unRead } = useGetAllUnreadNotficationsQuery(
    isLogin ? { userId: id } : skipToken,
  );
  return (
    <div
      className="flex px-5 md:px-10 py-2 items-center bg-primary 
      justify-between border-b-white border-b-2"
    >
      <div className="flex items-center gap-4">
        <Link to="/">
          <img className="w-30 h-full" src="/assets/logo.png" />
        </Link>
        <SearchBar />
        <Link to="/favorite">
          <FavoriteIcon color="error" />
        </Link>
      </div>
      {isLogin && id !== 0 ? (
        <div className="flex">
          <Button>
            <FileUploadIcon sx={{ color: "white" }} />
          </Button>
          <Button>
            <NotificationsIcon sx={{ color: "white" }} />
          </Button>
          <Button
            onClick={() => {
              navigate("/user");
            }}
          >
            <img alt={fullName} src={getThumbUri(avatar)} />
          </Button>
        </div>
      ) : (
        <div className="flex gap-1 ">
          <Link to={ROUTES.REGISTER}>
            <Button variant="secondary">ĐĂNG KÝ</Button>
          </Link>
          <Link to={ROUTES.LOGIN}>
            <Button variant="outline">ĐĂNG NHẬP</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Header;
