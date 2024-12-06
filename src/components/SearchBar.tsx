import { Box, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
const SeachBar = () => {
    return (
        <Box sx={{
            marginX: 2,
            border: "1px solid rgba(255,255,255,0.8)",
            borderRadius: 2,
            height: 40,
            paddingX: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <SearchIcon sx={{ mr: 2, color: "white" }} onClick={() => {
            }} />
            <InputBase
                sx={{
                    width: 250,
                    color: "white",
                    'input::placeholder': {
                        color: "white",
                        opacity: 1
                    }
                }}
                placeholder='Bạn cần tìm gì?'
            />
        </Box>
    );
}

export default SeachBar