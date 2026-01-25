import { ROUTES } from "@/app/router/routes";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { getThumbUri } from "../utils/uri";
import { LinkButton } from "./link-button";
import SearchBar from "./SearchBar";
const Header = () => {
  const { isLogin, fullName, avatar } = useAppSelector((state) => state.auth);
  const renderLinks = () => {
    if (isLogin) {
      return (
        <div>
          <LinkButton to={ROUTES.USER_NEW_DOC}>FileUploadIcon</LinkButton>
          <Button>NotificationsIcon</Button>
          <LinkButton to="/user">
            <img alt={fullName} className="w-20 " src={getThumbUri(avatar)} />
          </LinkButton>
        </div>
      );
    } else {
      <div className="flex gap-1 ">
        <Link to={ROUTES.REGISTER}>
          <Button variant="secondary">ĐĂNG KÝ</Button>
        </Link>
        <Link to={ROUTES.LOGIN}>
          <Button variant="outline">ĐĂNG NHẬP</Button>
        </Link>
      </div>;
    }
  };
  return (
    <header
      className="flex px-5 md:px-10 py-2 items-center bg-primary 
      justify-between border-b-white border-b-2"
    >
      <div className="flex items-center gap-4">
        <Link to="/">
          <img className="w-30 h-full" src="/assets/logo.png" />
        </Link>
        <SearchBar />
        <Link to="/favorite">FavoriteIcon</Link>
      </div>
      {renderLinks()}
    </header>
  );
};
export default Header;
