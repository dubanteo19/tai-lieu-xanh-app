import { DialogContext } from "@/context/DialogContext";
import { useContext } from "react";

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("use Dialog must be used within DialogProvider");
  return ctx;
};
