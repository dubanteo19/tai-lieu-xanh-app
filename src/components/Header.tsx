import {
  AppBar,
  Avatar,
  Box,
  Button,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import SeachBar from "./SearchBar";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
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
export const Header = () => {
  const { isLogin, fullName, avatar } = useSelector(
    (state: RootState) => state.auth,
  );
  const navigate = useNavigate();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Stack
          direction="row"
          sx={{
            bgcolor: "primary.main",
            paddingY: 1,
            paddingX: 30,
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
          <SeachBar />
          {isLogin ? (
            <Box sx={{ ml: 65 }}>
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
                  src={avatar}
                />
              </Button>
            </Box>
          ) : (
            <Stack sx={{ ml: 35 }} direction="row">
              <StyledNavLink to={"/register"}>ĐĂNG KÝ</StyledNavLink>
              <StyledNavLink to={"/login"}>ĐĂNG NHẬP</StyledNavLink>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
