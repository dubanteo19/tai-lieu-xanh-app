import { useState } from 'react'
import { Box, Fab } from "@mui/material";
import UserSpeedDial from '../components/User/UserSpeedDial';
import UserProfile from '../components/User/UserProfile';
import MyPosts from '../components/User/MyPosts';
import ChangePassword from '../components/User/ChangePassword';
import MyFriends from '../components/User/MyFriends';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { FriendRequest } from '../components/User/FriendRequest';
const User = () => {
    const [selectedComponent, setSelectedComponent] = useState('UserProfile');
    const [isExpanded, setIsExpanded] = useState(true);
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };
    const handleComponentChange = (componentName: string) => {
        setSelectedComponent(componentName);
    };
    return (
        <Box>
            <Box sx={{ paddingX: 10, paddingY: 3 }
            }>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Fab className="Fab" size="small" color="secondary" aria-label="add" onClick={handleToggle}>
                        {isExpanded ? <RemoveIcon /> : <AddIcon />}
                    </Fab>
                    <Box sx={{
                        flex: 3,
                        display: isExpanded ? 'block' : "none",
                        padding: '10px',
                    }}>
                        <UserSpeedDial onComponentChange={handleComponentChange} />
                    </Box>
                    < Box sx={{
                        flex: isExpanded ? 12 : 10,
                        padding: '10px',
                    }}>
                        {selectedComponent === 'UserProfile' && <UserProfile />}
                        {selectedComponent === 'MyPosts' && <MyPosts />}
                        {selectedComponent === 'MyFriends' && <MyFriends />}
                        {selectedComponent === 'FriendRequest' && <FriendRequest />}
                        {selectedComponent === 'ChangePassword' && <ChangePassword />}
                    </Box>
                </Box>

            </Box>
        </Box>

    )
}

export default User
