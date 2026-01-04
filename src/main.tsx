import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import "./index.css";
import { DialogProvider } from "./shared/components/dialog/DialogProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <DialogProvider>
      <App />
      <ToastContainer />
    </DialogProvider>
  </Provider>,
);
