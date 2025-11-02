import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { DialogProvider } from "./components/dialog/DialogProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <DialogProvider>
      <App />
      <ToastContainer />
    </DialogProvider>
  </Provider>,
);
