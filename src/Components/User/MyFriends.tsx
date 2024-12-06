
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Button, Paper, Avatar, Stack, InputBase, Grid } from '@mui/material';
import React, { useEffect, useState } from "react";
const MyFriends: React.FC = () => {
    return (
        <Paper sx={{ minHeight: 320, px: 5 }}>
            <Typography variant='h3' sx={{
                textAlign: 'center',
                position: 'relative',
                marginBottom: '20px',
            }}>
                Danh sách bạn bè
            </Typography>
        </Paper >
    )
}

export default MyFriends