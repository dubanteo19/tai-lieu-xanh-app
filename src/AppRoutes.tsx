import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
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
import Favorite from "./components/Favorite";
import { DeletedPosts } from "./admin/components/post/DeletedPosts";
import { ReviewPosts } from "./admin/components/post/ReviewPosts";
import NotificationPage from "./pages/Notification";
import { ReportPostPage } from "./admin/components/post/ReportPostPage";
import { TagManager } from "./admin/pages/TagManager";
import UserProfilePage from "./pages/UserProfile";
const AppRoutes: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<MDashboard />} />
        <Route path="posts">
          <Route index element={<PostManager />} />
          <Route path="deleted-posts" element={<DeletedPosts />} />
          <Route path="review-posts" element={<ReviewPosts />} />
          <Route path="report-posts" element={<ReportPostPage />} />
        </Route>
        <Route path="major" element={<MajorManager />} />
        <Route path="tag" element={<TagManager />} />
        <Route path="user" element={<UserManager />} />
        <Route path="comment" element={<CommentManager />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="verify" element={<Verify />} />
        <Route path="search" element={<Search />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="login" element={<Login />} />
        <Route path="profile">
          <Route path=":userId" element={<UserProfilePage />} />
        </Route>
        <Route path="user" element={<SecureRoute isLogin={isLogin} />}>
          <Route index element={<User />} />
          <Route path="new-doc" element={<NewDoc />} />
          <Route path="notification" element={<NotificationPage />} />
        </Route>
        <Route path="post">
          <Route path=":postId" element={<PostDetail />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
