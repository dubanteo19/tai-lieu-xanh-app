import { DialogContext } from "@/shared/context/DialogContext";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { FC, ReactNode, useState } from "react";

interface DialogProviderProps {
  children: ReactNode;
}
export const DialogProvider: FC<DialogProviderProps> = ({ children }) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const openDialog = (c: ReactNode) => {
    setContent(c);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
    setContent(null);
  };
  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};
