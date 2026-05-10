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
    if (isFetching) return "Đang chuẩn bị tài liệu";
    if (downloadStarted) return "Tài liệu đã được tải xuống";
    if (count === null)
      return "Vui lòng nhấn nút donwnload để tải xuống tài liệu";
    return `Tài liệu sẽ được tải xuống trong ${count} giây`;
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center">Tải tài liệu</DialogTitle>
      </DialogHeader>
      {isFetching ? <p>CircularProgress </p> : <p>{renderMessage()}</p>}
      <div className="flex gap-2 justify-end">
        <Button disabled={isFetching} onClick={prepareDownload}>
          {isFetching ? "Preparing" : "Download"}
        </Button>
        <Button variant={"destructive"} onClick={closeDialog}>
          Đóng
        </Button>
      </div>
    </>
  );
};
