import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const SeachBar = ({ color = "white" }) => {
  return (
    <Box
      sx={{
        marginX: 2,
        border: `1px solid `,
        borderColor: color,
        borderRadius: 2,
        height: 40,
        paddingX: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchIcon sx={{ mr: 2, color: color }} onClick={() => { }} />
      <InputBase
        sx={{
          width: 250,
          color: color,
          "input::placeholder": {
            color: color,
            opacity: 1,
          },
        }}
        placeholder="Bạn cần tìm gì?"
      />
    </Box>
  );
};

export default SeachBar;
