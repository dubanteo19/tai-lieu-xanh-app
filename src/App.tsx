import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { colors, createTheme, ThemeProvider } from "@mui/material";
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
