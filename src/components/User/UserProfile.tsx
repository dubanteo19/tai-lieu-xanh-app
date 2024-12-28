import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Paper,
  Avatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EmailIcon from "@mui/icons-material/Email";
import React from "react";
import { useGetInfoQuery } from "../../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import FullLoading from "../FullLoading";
import { setSlectedComponent } from "../../features/user-menu/userMenuSlice";
import { getThumbUri } from "../../utils/uri";
const UserProfile: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.id);
  const { data, isLoading } = useGetInfoQuery(userId);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading && <FullLoading />}
      <Paper sx={{ minHeight: 320, width: 800, py: 2, px: 5 }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            position: "relative",
          }}
        >
          Thông tin tài khoản
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Box position="relative">
            <Avatar
              sx={{ width: 80, height: 80 }}
              src={getThumbUri(data?.avatar || "")}
            />
          </Box>
        </Box>
        <Box>
          <Paper
            sx={{ p: 2, width: 500, my: 2, mx: "auto", position: "relative" }}
          >
            <Typography
              sx={{ position: "absolute", top: -10, fontStyle: "italic" }}
              variant="body1"
            >
              Tiểu sử:
            </Typography>
            <Typography>{data?.bio || "Chưa có tiểu sử"}</Typography>
          </Paper>
        </Box>
        <List
          sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}
          aria-label="contacts"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Tên người dùng" />
              <ListItemText
                sx={{ textAlign: "right" }}
                primary={data?.fullName}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Email:" />
              <ListItemText
                sx={{ textAlign: "right" }}
                primary={data?.email || "Chưa có email"}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Diversity3Icon />
              </ListItemIcon>
              <ListItemText primary="Bạn bè" />
              <ListItemText
                sx={{ textAlign: "right" }}
                primary={data?.friends || 0}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Bài viết" />
              <ListItemText
                sx={{ textAlign: "right" }}
                primary={data?.posts || 0}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Button
            id="update-btn"
            onClick={() => dispatch(setSlectedComponent("UserProfileUpdate"))}
            color="success"
            variant="contained"
            sx={{ margin: 1 }}
          >
            Cập nhật thông tin
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserProfile;
