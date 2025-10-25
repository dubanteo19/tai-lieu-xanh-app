import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const SeachBar = ({ color = "white" }) => {
  const [keyword, setKeyword] = useState<string>("");
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate("/search?keyword=" + keyword); // Navigate on Enter
    }
  };
  const navigate = useNavigate();
  return (
    <div className="center px-2 rounded-2xl border-white border-2">
      <Input
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        className="outline-none border-none  text-white
        focus-visible:ring-0 focus-visible:border-none
        placeholder:text-white"
        value={keyword}
        placeholder="Bạn cần tìm gì?"
      ></Input>
      <SearchIcon
        sx={{ mr: 2, color: color }}
        onClick={() => {
          navigate("/search?keyword=" + keyword);
        }}
      />
    </div>
  );
};

export default SeachBar;
