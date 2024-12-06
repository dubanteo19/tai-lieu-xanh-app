import { Box, Typography } from '@mui/material'
import React from 'react'
interface TitleBarProps {
    text: string
}
export const TitleBar: React.FC<TitleBarProps> = ({ text }) => {
    return (
        <Box sx={{
            bgcolor: "primary.main",
            paddingX: 5,
            paddingY: 1,
            color: "white",
            textAlign: "center"
        }}>
            <Typography fontWeight="bold">
                {text}
            </Typography>
        </Box>
    )
}
