import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CommentIcon from "@mui/icons-material/Comment";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
export const navData = [
  {
    title: "Bảng điều khiển",
    path: "/admin",
    icon: AnalyticsIcon,
  },
  {
    title: "Tài liệu",
    path: "/admin/post",
    icon: TextSnippetIcon,
  },
  {
    title: "Tài liệu - Danh mục",
    path: "/admin/major",
    icon: AutoAwesomeMotionIcon,
  },
  {
    title: "Người dùng",
    path: "/admin/user",
    icon: AccountCircleIcon,
  },
  {
    title: "Bình luận",
    path: "/admin/comment",
    icon: CommentIcon,
  },
];
