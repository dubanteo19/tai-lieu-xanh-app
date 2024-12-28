import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CommentIcon from "@mui/icons-material/Comment";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import LabelIcon from "@mui/icons-material/Label";
export const navData = [
  {
    title: "Bảng điều khiển",
    path: "/admin/dashboard",
    icon: AnalyticsIcon,
  },
  {
    title: "Tài liệu",
    path: "/admin/posts",
    icon: TextSnippetIcon,
  },
  {
    title: "Tài liệu - Danh mục ngành",
    path: "/admin/major",
    icon: AutoAwesomeMotionIcon,
  },
  {
    title: "Tài liệu - Nhãn",
    path: "/admin/tag",
    icon: LabelIcon,
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
