import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import { colors, createTheme, ThemeProvider } from "@mui/material";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import User from "./pages/User";
import { NewDoc } from "./pages/NewDoc";
import { AdminLayout } from "./admin/AdminLayout";
import { MDashboard } from "./admin/pages/MDashboard";
import { PostManager } from "./admin/pages/PostManager";
import { MajorManager } from "./admin/pages/MajorManager";
import { UserManager } from "./admin/pages/UserManager";
import { CommentManager } from "./admin/pages/CommentManager";
import { Search } from "./pages/Search";
import Verify from "./pages/Verify";
import SecureRoute from "./SecureRoute";
const AppRoutes: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<MDashboard />} />
        <Route path="post" element={<PostManager />} />
        <Route path="major" element={<MajorManager />} />
        <Route path="user" element={<UserManager />} />
        <Route path="comment" element={<CommentManager />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="verify" element={<Verify />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<Login />} />
        <Route path="user" element={<SecureRoute isLogin={isLogin} />}>
          <Route index element={<User />} />
          <Route path="new-doc" element={<NewDoc />} />
        </Route>
        <Route path="post">
          <Route path=":postId" element={<PostDetail />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
