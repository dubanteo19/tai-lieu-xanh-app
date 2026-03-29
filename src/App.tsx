import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "@/app/router";
import { AuthInitilizer } from "@/features/auth/components/auth-initializer";
function App() {
  return (
    <AuthInitilizer>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthInitilizer>
  );
}

export default App;
