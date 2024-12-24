import {
  Box,
  List,
  ListItem,
  Typography,
  Button,
  Paper,
  Avatar,
  TextField,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useEffect } from "react";
import { IUserUpdateInfo, useUpdateInfoMutation } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import FullLoading from "../FullLoading";
import { setSlectedComponent } from "../../features/user-menu/userMenuSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const UserProfileUpdate: React.FC = () => {
  const notify = withReactContent(Swal);
  const { fullName, bio, id, isLogin } = useSelector(
    (state: RootState) => state.auth,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserUpdateInfo>();
  const [updateInfo, { data, isLoading }] = useUpdateInfoMutation();
  const handleUpdateInfo: SubmitHandler<IUserUpdateInfo> = async (data) => {
    try {
      const re = await updateInfo({
        ...data,
        id: id,
      }).unwrap();
      if (re) {
        notify.fire({
          icon: "success",
          title: "Thông báo",
          text: "Cập nhật thông tin tài khoản thành công",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [data]);
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
          Cap nhap Thông tin tài khoản
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Box position="relative">
            <Avatar sx={{ width: 80, height: 80 }} src={data?.avatar || ""} />
            <CameraAltIcon
              sx={{
                position: "absolute",
                bottom: 1,
                padding: 0.5,
                right: 0.5,
                borderRadius: 100,
                background: "gray",
              }}
            />
          </Box>
        </Box>
        <Box component={"form"} onSubmit={handleSubmit(handleUpdateInfo)}>
          <List
            sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}
            aria-label="contacts"
          >
            <ListItem sx={{ px: 20 }}>
              <TextField
                id="name"
                fullWidth
                {...register("fullName", { required: "Vui lòng nhập họ tên" })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message || null}
                label="Họ tên"
                defaultValue={fullName}
              ></TextField>
            </ListItem>
            <ListItem sx={{ px: 20 }}>
              <TextField
                id="name"
                multiline
                label="Giới thiệu"
                {...register("bio")}
                rows={7}
                fullWidth
                defaultValue={bio}
              ></TextField>
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
              color="info"
              variant="contained"
              onClick={() => dispatch(setSlectedComponent("UserProfile"))}
              sx={{ margin: 1 }}
            >
              Quay lại
            </Button>
            <Button
              id="update-btn"
              color="success"
              variant="contained"
              type="submit"
              sx={{ margin: 1 }}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserProfileUpdate;
