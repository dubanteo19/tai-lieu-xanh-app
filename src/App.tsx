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
import AppRoutes from "./AppRoutes";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
const theme = createTheme({
  palette: {
    primary: {
      main: colors.lightGreen[400],
      darker: colors.lightGreen[900],
    },
    mSecondary: {
      main: colors.lightGreen[400],
    },
    secondary: {
      main: colors.grey[200],
    },
    text: {
      secondary: colors.grey[500],
    },
    background: {
      default: "#fff",
    },
  },
  transitions: {
    duration: {
      standard: 500,
    },
  },
});
function App() {
  const { isLogin } = useSelector((state: RootState) => state.auth);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes isLogin={isLogin} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
