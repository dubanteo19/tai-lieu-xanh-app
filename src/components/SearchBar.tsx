import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SeachBar = ({ color = "white" }) => {
  const [keyword, setKeyword] = useState<string>("");
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate("/search?keyword=" + keyword); // Navigate on Enter
    }
  };
  const navigate = useNavigate();
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
      <InputBase
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        value={keyword}
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
      <SearchIcon
        sx={{ mr: 2, color: color }}
        onClick={() => {
          navigate("/search?keyword=" + keyword);
        }}
      />
    </Box>
  );
};

export default SeachBar;
