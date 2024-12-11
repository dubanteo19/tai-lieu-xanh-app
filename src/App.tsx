import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./page/Layout";
import Home from "./page/Home";
import { colors, createTheme, Stack, ThemeProvider } from "@mui/material";
import { Register } from "./page/Register";
import { Login } from "./page/Login";
import PostDetail from "./page/PostDetail";
import User from "./page/User";
import { NewDoc } from "./page/NewDoc";
const theme = createTheme({
  palette: {
    primary: {
      main: colors.lightGreen[400],
    },
    secondary: {
      main: colors.grey[200],
    },
    text: {
      secondary: colors.grey[400],
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
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="user">
              <Route index element={<User />} />
              <Route path="new-doc" element={<NewDoc />} />
            </Route>
            <Route path="post">
              <Route path=":postId" element={<PostDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
