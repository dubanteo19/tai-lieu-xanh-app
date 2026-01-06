import { DialogBaseProps } from "@/components/dialog/DialogBaseProps";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CircularProgress } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface DownloadDialogProps extends DialogBaseProps {
  handleDownload: () => void;
}
export const DownloadDialog: FC<DownloadDialogProps> = ({
  isFetching,
  closeDialog,
  handleDownload,
}) => {
  const [count, setCount] = useState<number | null>(null);
  const [downloadStarted, setDownloadStarted] = useState<boolean>(false);
  useEffect(() => {
    if (count === null) return;
    if (count === 0) {
      handleDownload();
      setCount(0);
      setDownloadStarted(true);
      return;
    }
    const timer = setTimeout(() => {
      setCount((prev) => (prev ?? 0) - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count, handleDownload]);
  const prepareDownload = () => {
    setCount(5);
    setDownloadStarted(false);
  };
  const renderMessage = () => {
    if (isFetching) return "Preparing your file...";
    if (downloadStarted) return "Your download has started";
    if (count === null) return "Click below to start download";
    return `Your download will start in ${count} second (s)`;
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Download document</DialogTitle>
      </DialogHeader>
      {isFetching ? <CircularProgress /> : <h2>{renderMessage()}</h2>}
      <Button disabled={isFetching} onClick={prepareDownload}>
        {isFetching ? "Preparing" : "Download"}
      </Button>
      <div className="flex gap-2 justify-end">
        <Button variant={"destructive"} onClick={closeDialog}>
          Close
        </Button>
      </div>
    </>
  );
};
