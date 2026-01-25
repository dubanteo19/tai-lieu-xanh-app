import { useContext } from "react";
import { DialogContext } from "../context/DialogContext";

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("use Dialog must be used within DialogProvider");
  return ctx;
};
