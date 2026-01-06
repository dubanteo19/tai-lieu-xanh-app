import { DeletedPosts } from "@/admin/components/post/DeletedPosts";
import { ReportPostPage } from "@/admin/components/post/ReportPostPage";
import { ReviewPosts } from "@/admin/components/post/ReviewPosts";
import {
  MajorManager,
  MDashboard,
  PostManager,
  TagManager,
  CommentManager,
  UserManager,
} from "@/admin/pages";
import {
  ResetPassword,
  PostDetail,
  NotificationPage,
  NewDocPage,
  ForgotPassword,
  Home,
  Register,
  User,
  FavoritePage,
  SearchPage,
  VerifyPage,
  UserProfilePage,
  LoginPage,
} from "@/pages";
import { RouteObject, useRoutes } from "react-router-dom";
import { ROUTES } from "./routes";
import { Layout } from "../layouts/main-layout";
import { AdminLayout } from "@/admin/AdminLayout";
import SecureRoute from "./protected-route";

const appRoutes: RouteObject[] = [
  {
    path: ROUTES.ADMIN,
    element: <AdminLayout />,
    children: [
      {
        path: ROUTES.ADMIN_DASHBOARD.replace("/admin/", ""),
        element: <MDashboard />,
      },
      {
        path: "posts",
        children: [
          { index: true, element: <PostManager /> },
          { path: "deleted-posts", element: <DeletedPosts /> },
          { path: "review-posts", element: <ReviewPosts /> },
          { path: "report-posts", element: <ReportPostPage /> },
        ],
      },
      { path: "major", element: <MajorManager /> },
      { path: "tag", element: <TagManager /> },
      { path: "user", element: <UserManager /> },
      { path: "comment", element: <CommentManager /> },
    ],
  },
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.REGISTER, element: <Register /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: ROUTES.RESET_PASSWORD,
        element: <ResetPassword />,
      },
      { path: ROUTES.VERIFY, element: <VerifyPage /> },
      { path: ROUTES.SEARCH, element: <SearchPage /> },
      { path: ROUTES.FAVORITE, element: <FavoritePage /> },

      { path: "profile/:userId", element: <UserProfilePage /> },
      {
        path: ROUTES.USER_ROOT,
        element: <SecureRoute />,
        children: [
          { index: true, element: <User /> },
          { path: ROUTES.USER_NEW_DOC, element: <NewDocPage /> },
          { path: ROUTES.USER_NOTIFICATION, element: <NotificationPage /> },
        ],
      },

      { path: ROUTES.POST_DETAIL, element: <PostDetail /> },
    ],
  },
];
const AppRoutes = () => {
  return useRoutes(appRoutes);
};
export default AppRoutes;
