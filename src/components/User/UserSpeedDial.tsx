import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import PasswordIcon from "@mui/icons-material/Password";
import Typography from "@mui/material/Typography";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setSlectedComponent } from "../../features/user-menu/userMenuSlice";
import { logout } from "../../features/auth/authSlice";

interface UserSpeedDialProps {
  onComponentChange: (componentName: string) => void;
}

const UserSpeedDial: React.FC<UserSpeedDialProps> = ({ onComponentChange }) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);

  const selectedComponent = useSelector(
    (state: RootState) => state.userMenu.selectedComponent,
  );
  const dispatch = useDispatch();
  const handleItemClick = (componentName: string) => {
    if (componentName !== "Friends") {
      dispatch(setSlectedComponent(componentName));
    }
    setOpenSubmenu((prev) => (componentName === "Friends" ? !prev : false));
  };

  useEffect(() => {
    onComponentChange(selectedComponent);
  }, [selectedComponent, onComponentChange]);
  return (
    <Box className="UserProfile">
      <div className="left">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding sx={{ my: 2 }}>
                Xin chào Du Ban Teo
                <Typography sx={{ mx: 1, color: "red" }}> !</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleItemClick("UserProfile")}
                  selected={
                    selectedComponent === "UserProfile" ||
                    selectedComponent === "UserProfileUpdate"
                  }
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "white",
                      "& .MuiListItemIcon-root": { color: "white" },
                    },
                  }}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Thông tin" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleItemClick("MyPosts")}
                  selected={selectedComponent === "MyPosts"}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "white",
                      "& .MuiListItemIcon-root": { color: "white" },
                    },
                  }}
                >
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bài viết" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleItemClick("Friends")}
                  selected={selectedComponent === "Friends"}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "white",
                      "& .MuiListItemIcon-root": { color: "white" },
                    },
                  }}
                >
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bạn bè" />
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => handleItemClick("MyFriends")}
                    selected={selectedComponent === "MyFriends"}
                  >
                    <ListItemText primary="Tất cả bạn bè" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => handleItemClick("FriendRequest")}
                    selected={selectedComponent === "FriendRequest"}
                  >
                    <ListItemText primary="Lời mời kết bạn" />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleItemClick("ChangePassword")}
                  selected={selectedComponent === "ChangePassword"}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "white",
                      "& .MuiListItemIcon-root": { color: "white" },
                    },
                  }}
                >
                  <ListItemIcon>
                    <PasswordIcon />
                  </ListItemIcon>
                  <ListItemText primary="Đổi mật khẩu" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
          <nav aria-label="secondary mailbox folders">
            <List>
              <ListItem>
                <ListItemButton onClick={() => dispatch(logout())}>
                  <ListItemText primary="Đăng xuất" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </div>
    </Box>
  );
};

export default UserSpeedDial;
