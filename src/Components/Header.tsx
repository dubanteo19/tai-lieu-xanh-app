import { AppBar, Box, Stack, styled, Toolbar, Typography } from "@mui/material"
import { NavLink } from "react-router-dom";
import SeachBar from "./SearchBar";
const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    fontSize: 16,
    padding: 10,
    fontWeight: 'normal',
    color: 'white',
    ':hover': {
        background: 'white',
        color: theme.palette.primary.main
    },
    '&.active': {
        color: 'white'
    },
    '&.inactive': {
        fontWeight: 'normal',
    },
    '&.visited': {
        color: "white",
        fontWeight: 'normal',
    },
}));
export const Header = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Stack direction="row" sx={{
                    bgcolor: "primary.main",
                    paddingY: 1,
                    paddingX: 30
                }}>
                    <StyledNavLink to={"/home"}>
                        LOGO
                    </StyledNavLink>
                    <StyledNavLink to={"/home"}>
                        TRANG CHỦ
                    </StyledNavLink>
                    <StyledNavLink to={"/home"}>
                    </StyledNavLink>
                    <SeachBar />
                    <Stack sx={{ ml: 10 }} direction="row">
                        <StyledNavLink to={"/register"}>
                            ĐĂNG KÝ
                        </StyledNavLink>
                        <StyledNavLink to={"/login"}>
                            ĐĂNG NHẬP
                        </StyledNavLink>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
