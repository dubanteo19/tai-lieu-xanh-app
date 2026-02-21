import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";

const SeachBar = ({ color = "white" }) => {
  const [keyword, setKeyword] = useState<string>("");
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate("/search?keyword=" + keyword); // Navigate on Enter
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex-center hidden md:flex px-2 rounded-2xl border-white border-2 text-white">
      <Input
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        className="outline-none border-none  
        focus-visible:ring-0 focus-visible:border-none
        placeholder:text-white"
        value={keyword}
        placeholder="Bạn cần tìm gì?"
      ></Input>
      <SearchIcon />
    </div>
  );
};

export default SeachBar;
