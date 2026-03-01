import { ROUTES } from "@/app/router/routes";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { BellIcon, HeartIcon, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { LinkButton } from "../ui/link-button";
import SearchBar from "./search-bar";
import { ImageHolder } from "../ui/image-holder";
export const Header = () => {
  const { isLogin, userSummary } = useAppSelector((state) => state.auth);
  const renderLinks = () => {
    if (isLogin) {
      return (
        <div className="flex items-center">
          <LinkButton to={ROUTES.USER_NEW_DOC}>
            <Upload />
          </LinkButton>
          <LinkButton to={ROUTES.USER_NOTIFICATION}>
            <BellIcon />
          </LinkButton>
          <LinkButton to={ROUTES.USER_ROOT}>
            <ImageHolder
              className="size-8 rounded-full"
              src={userSummary?.avatarUrl}
            />
          </LinkButton>
        </div>
      );
    } else {
      return (
        <div className="flex gap-2 ">
          <LinkButton to={ROUTES.REGISTER}>ĐĂNG KÝ</LinkButton>
          <LinkButton to={ROUTES.LOGIN}>ĐĂNG NHẬP</LinkButton>
        </div>
      );
    }
  };
  return (
    <header
      className="flex px-5 md:px-10 py-2 items-center bg-primary 
      justify-between border-b-white border-b-2"
    >
      <div className="flex items-center gap-4">
        <LinkButton to={ROUTES.HOME} className="text-2xl font-bold">
          TLX
        </LinkButton>
        <SearchBar />
        <Link to="/favorite">
          <HeartIcon color="white" />
        </Link>
      </div>
      {renderLinks()}
    </header>
  );
};
