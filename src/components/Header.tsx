import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Stack,
  IconButton,
  Badge,
  Button,
  Avatar,
  Box,
  styled,
} from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SearchBar from "./SearchBar"; // Adjust the import path
import { useGetAllUnreadNotficationsQuery } from "../api/notificationApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getThumbUri } from "../utils/uri";
import logo from "../assets/logo.png";
export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  fontSize: 16,
  padding: 10,
  fontWeight: "normal",
  color: "white",
  ":hover": {
    background: "white",
    color: theme.palette.primary.main,
  },
  "&.active": {
    color: "white",
  },
  "&.inactive": {
    fontWeight: "normal",
  },
  "&.visited": {
    color: "white",
    fontWeight: "normal",
  },
}));
const Header = () => {
  const navigate = useNavigate();
  const { isLogin, id, fullName, avatar } = useSelector(
    (state: RootState) => state.auth,
  );

  const favorite = useSelector((state: RootState) => state.favorite);
  const { data: unRead } = useGetAllUnreadNotficationsQuery(
    isLogin ? { userId: id } : skipToken, // Pass skipToken if not logged in
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            bgcolor: "primary.main",
            paddingY: 1,
            paddingX: 27,
          }}
        >
          <NavLink to="/">
            <Box
              sx={{
                width: 150,
                height: 40,
              }}
              component="img"
              src={logo}
            />
          </NavLink>
          <SearchBar />
          <Link to="/favorite">
            <Badge badgeContent={favorite.length} color="success">
              <FavoriteIcon color="error" />
            </Badge>
          </Link>
          {isLogin && id !== 0 ? (
            <Stack sx={{ ml: 45 }} direction="row">
              <IconButton
                sx={{
                  "&:focus": {
                    outline: "none",
                  },
                }}
                onClick={() => navigate("/user/new-doc")}
              >
                <FileUploadIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton
                sx={{
                  "&:focus": {
                    outline: "none",
                  },
                }}
                onClick={() => navigate("user/notification")}
              >
                <Badge badgeContent={unRead?.length || 0} color="error">
                  <NotificationsIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
              <Button
                onClick={() => {
                  navigate("/user");
                }}
                sx={{
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                <Avatar
                  sx={{
                    "&:hover": {
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                  alt={fullName}
                  src={getThumbUri(avatar)}
                />
              </Button>
            </Stack>
          ) : (
            <Stack
              sx={{ ml: 35, alignItems: "center" }}
              spacing={1}
              direction="row"
            >
              <StyledNavLink to={"/register"}>ĐĂNG KÝ</StyledNavLink>
              <StyledNavLink to={"/login"}>ĐĂNG NHẬP</StyledNavLink>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
