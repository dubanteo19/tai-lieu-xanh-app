import { DialogBaseProps } from "@/shared/components/dialog/DialogBaseProps";
import { Button } from "@/shared/ui/button";
import { DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { useEffect, useState } from "react";

interface DownloadDialogProps extends DialogBaseProps {
  handleDownload: () => void;
}
export const DownloadDialog = ({
  isFetching,
  closeDialog,
  handleDownload,
}: DownloadDialogProps) => {
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
      {isFetching ? <p>CircularProgress </p> : <h2>{renderMessage()}</h2>}
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
