import React, { useEffect, useState } from 'react';
import { Fab, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PasswordIcon from '@mui/icons-material/Password';
// import '../../assets/user.css';
import Typography from "@mui/material/Typography";

interface UserSpeedDialProps {
    onComponentChange: (componentName: string) => void;
}

const UserSpeedDial: React.FC<UserSpeedDialProps> = ({ onComponentChange }) => {
    const [selectedComponent, setSelectedComponent] = useState<string>('UserProfile');

    const handleItemClick = (componentName: string) => {
        setSelectedComponent(componentName);
    };

    useEffect(() => {
        onComponentChange(selectedComponent);
    }, [selectedComponent, onComponentChange]);
    return (
        <Box className="UserProfile">
            <div className="left">
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }} >
                    <nav aria-label="main mailbox folders">
                        <List>
                            <ListItem disablePadding sx={{ my: 2 }}>
                                Xin chào Du Ban Teo
                                <Typography sx={{ mx: 1, color: "red" }}> !</Typography>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleItemClick('UserProfile')}
                                    selected={selectedComponent === 'UserProfile'}
                                    sx={{
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '& .MuiListItemIcon-root': { color: 'white' }
                                        }
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
                                    onClick={() => handleItemClick('MyPosts')}
                                    selected={selectedComponent === 'MyPosts'}
                                    sx={{
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '& .MuiListItemIcon-root': { color: 'white' }
                                        }
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
                                    onClick={() => handleItemClick('MyFriends')}
                                    selected={selectedComponent === 'MyFriends'}
                                    sx={{
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '& .MuiListItemIcon-root': { color: 'white' }
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Bạn bè" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => handleItemClick('ChangePassword')}
                                    selected={selectedComponent === 'ChangePassword'}
                                    sx={{
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '& .MuiListItemIcon-root': { color: 'white' }
                                        }
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
                                <ListItemButton >
                                    <ListItemText primary="Đăng xuất" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            </div >
        </Box >
    );
}

export default UserSpeedDial;