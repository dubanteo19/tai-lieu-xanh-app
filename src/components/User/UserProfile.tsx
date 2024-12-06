import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Button, Paper, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmailIcon from '@mui/icons-material/Email';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import React, { useEffect, useState } from "react";
const UserProfile: React.FC = () => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Paper sx={{ minHeight: 320, width: 800, py: 2, px: 5 }}>
                <Typography variant='h3' sx={{
                    textAlign: 'center',
                    position: 'relative',
                }}>
                    Thông tin tài khoản
                </Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center"
                }} >
                    <Box position="relative">
                        <Avatar sx={{ width: 80, height: 80 }} src='https://avatar.iran.liara.run/public/45' />
                        <CameraAltIcon sx={{
                            position: "absolute",
                            bottom: 1,
                            padding: 0.5,
                            right: 0.5,
                            borderRadius: 100,
                            background: "gray"
                        }} />
                    </Box>
                </Box>
                <List
                    sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}
                    aria-label="contacts"
                >
                    <ListItem disablePadding>
                        <ListItemButton>

                            <ListItemIcon>
                                <LocalPhoneIcon />
                            </ListItemIcon>
                            <ListItemText primary="Số điện thoại:" />
                            <ListItemText sx={{ textAlign: "right" }} primary="092582144" />
                            {/* <ListItemText sx={{ textAlign: 'right' }} primary={user?.phone || 'Chưa có số điện thoại'} /> */}
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Email:" />
                            <ListItemText sx={{ textAlign: "right" }} primary="dubanteo2003@gmail.com" />
                            {/* <ListItemText sx={{ textAlign: 'right' }} primary={user?.email || 'Chưa có email'} /> */}
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tên người dùng" />
                            <ListItemText sx={{ textAlign: "right" }} primary="Du Ban Teo" />
                            {/* <ListItemText sx={{ textAlign: 'right' }} primary={defaultAddressString || "Không có địa chỉ"} /> */}
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ThumbUpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Lượt thích" />
                            <ListItemText
                                sx={{ textAlign: 'right' }}
                                primary="50"
                            />
                        </ListItemButton>
                    </ListItem>

                </List>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center"
                }}>
                    <Button variant="contained"
                        sx={{ margin: 1 }}>
                        Cập nhật thông tin
                    </Button>
                </Box>
            </Paper >

        </Box>
    )
}

export default UserProfile