import { createContext, ReactNode } from "react";

type DialogContextType = {
  openDialog: (content: ReactNode) => void;
  closeDialog: () => void;
};
export const DialogContext = createContext<DialogContextType | null>(null);
