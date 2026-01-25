import { AdminLayout } from "@/admin/AdminLayout";
import { DeletedPosts } from "@/admin/components/post/DeletedPosts";
import { ReportPostPage } from "@/admin/components/post/ReportPostPage";
import { ReviewPosts } from "@/admin/components/post/ReviewPosts";
import {
  CommentManager,
  MajorManager,
  MDashboard,
  PostManager,
  TagManager,
  UserManager,
} from "@/admin/pages";
import {
  FavoritePage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NewDocPage,
  NotificationPage,
  PostDetailPage,
  RegisterPage,
  ResetPasswordPage,
  SearchPage,
  UserPage,
  UserProfilePage,
  VerifyPage,
} from "@/pages";
import { RouteObject, useRoutes } from "react-router-dom";
import { Layout } from "../layouts/main-layout";
import SecureRoute from "./protected-route";
import { ROUTES } from "./routes";

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
      { index: true, element: <HomePage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: ROUTES.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
      { path: ROUTES.VERIFY, element: <VerifyPage /> },
      { path: ROUTES.SEARCH, element: <SearchPage /> },
      { path: ROUTES.FAVORITE, element: <FavoritePage /> },

      { path: "profile/:userId", element: <UserProfilePage /> },
      {
        path: ROUTES.USER_ROOT,
        element: <SecureRoute />,
        children: [
          { index: true, element: <UserPage /> },
          { path: ROUTES.USER_NEW_DOC, element: <NewDocPage /> },
          { path: ROUTES.USER_NOTIFICATION, element: <NotificationPage /> },
        ],
      },

      { path: ROUTES.POST_DETAIL, element: <PostDetailPage /> },
    ],
  },
];
const AppRoutes = () => {
  return useRoutes(appRoutes);
};
export default AppRoutes;
