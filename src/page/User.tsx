import { useState } from 'react'
import { Box } from "@mui/material";
import UserSpeedDial from '../Components/User/UserSpeedDial';
import UserProfile from '../Components/User/UserProfile';
import MyPosts from '../Components/User/MyPosts';
import ChangePassword from '../Components/User/ChangePassword';
import MyFriends from '../Components/User/MyFriends';

const User = () => {
    const [selectedComponent, setSelectedComponent] = useState('UserProfile');
    const handleComponentChange = (componentName: string) => {
        setSelectedComponent(componentName);
    };
    return (
        <Box>
            <Box sx={{ paddingX: 10, paddingY: 10 }
            }>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Box sx={{ flex: 2, padding: '10px' }}>
                        <UserSpeedDial onComponentChange={handleComponentChange} />
                    </Box>
                    < Box sx={{ flex: 10, padding: '10px' }}>
                        {selectedComponent === 'UserProfile' && <UserProfile />}
                        {selectedComponent === 'MyPosts' && <MyPosts />}
                        {selectedComponent === 'MyFriends' && <MyFriends />}
                        {selectedComponent === 'ChangePassword' && <ChangePassword />}
                    </Box>
                </Box>

            </Box>
        </Box>

    )
}

export default User