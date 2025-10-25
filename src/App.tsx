import { colors, createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "@/AppRoutes";
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
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
