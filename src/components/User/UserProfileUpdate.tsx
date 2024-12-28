import {
  Box,
  List,
  ListItem,
  Typography,
  Button,
  Paper,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useState } from "react";
import {
  IUserUpdateInfo,
  useGetInfoQuery,
  useUpdateInfoMutation,
} from "../../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import FullLoading from "../FullLoading";
import { setSlectedComponent } from "../../features/user-menu/userMenuSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { getThumbUri } from "../../utils/uri";
const UserProfileUpdate: React.FC = () => {
  const { id } = useSelector((state: RootState) => state.auth);
  const { data: user } = useGetInfoQuery(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserUpdateInfo>();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null | ArrayBuffer>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
  };

  const [updateInfo, { data, isLoading }] = useUpdateInfoMutation();
  const handleUpdateInfo: SubmitHandler<IUserUpdateInfo> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("bio", data.bio);
      formData.append("id", id.toString());
      if (avatarFile) {
        formData.append("avatar", avatarFile); // Add avatar to the request
      }
      const re = await updateInfo(formData).unwrap();
      if (re) {
        dispatch(setSlectedComponent("UserProfile"));
      }
    } catch (error) {
      console.log(error);
    }
  };
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
          Cập nhập thông tin tài khoản
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
              src={preview || getThumbUri(user?.avatar) || ""}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 1,
                padding: 0.5,
                width: 30, // Ensure width and height are equal
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%", // Makes the box circular
                right: 0.5,
                background: "rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
              }}
              component={"label"}
            >
              <CameraAltIcon />
              <input
                type="file"
                style={{ visibility: "hidden" }}
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Box>
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
                defaultValue={user?.fullName}
              ></TextField>
            </ListItem>
            <ListItem sx={{ px: 20 }}>
              <TextField
                id="name"
                multiline
                label="Tiểu sử"
                {...register("bio")}
                rows={7}
                fullWidth
                defaultValue={user?.bio}
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
