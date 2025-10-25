import { AdminLayout } from "@/admin/AdminLayout";
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
import { ROUTES } from "@/routes/routes";
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
  Login,
  SearchPage,
  VerifyPage,
  UserProfilePage,
} from "@/pages";
import { Layout } from "@/pages/Layout";
import SecureRoute from "./SecureRoute";
import { RouteObject, useRoutes } from "react-router-dom";

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
      { path: ROUTES.LOGIN, element: <Login /> },
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
export const AppRoutes = () => {
  return useRoutes(appRoutes);
};
