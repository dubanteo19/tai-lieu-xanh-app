import {
  useGetAllReasonsQuery,
  useReportPostMutation,
} from "@/admin/api/reportApi";
import { useLazyGetDocumentPresignedUrlQuery } from "@/features/mdoc/api/mDoc.api";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useDialog } from "@/shared/hooks/useDialog";
import { Button } from "@/shared/ui/button";
import { downloadFileFromUrl } from "@/shared/utils/downloadFile";
import { ReportDialog } from "../../report-post/ReportDialog";
import { DownloadDialog } from "../dialogs/download-dialog";

interface PostActionButtonGroupProps {
  postId: number;
}
export const PostActionButtonGroup = ({
  postId,
}: PostActionButtonGroupProps) => {
  const { id: userId } = useAppSelector((state) => state.auth);
  const { data: reasons, isFetching: isFetchingReasons } =
    useGetAllReasonsQuery();
  const [reportPost, { isLoading, isError }] = useReportPostMutation();
  const handleReportPost = (reason: string) => {
    try {
      reportPost({ postId, userId, reason });
    } catch (error) {
      console.log(error);
    }
  };
  const [triggerGetPresignedUrl, { isFetching }] =
    useLazyGetDocumentPresignedUrlQuery();
  const { openDialog, closeDialog } = useDialog();
  const handleDownload = async () => {
    const presignedUrl = await triggerGetPresignedUrl(postId).unwrap();
    downloadFileFromUrl(presignedUrl.url);
  };
  const handleOpenDownloadPopup = async () => {
    openDialog(
      <DownloadDialog
        handleDownload={handleDownload}
        isFetching={isFetching}
        closeDialog={closeDialog}
      />,
    );
  };
  const handleOpenReportPopup = () => {
    if (reasons)
      openDialog(
        <ReportDialog
          reasons={reasons}
          isFetching={isFetchingReasons}
          closeDialog={closeDialog}
          handleReport={handleReportPost}
        />,
      );
  };
  return (
    <div className="flex justify-between border p-2">
      <div className="flex gap-2">
        <div>
          <Button>Love</Button>
        </div>
        <Button onClick={handleOpenDownloadPopup} color="warning">
          Tải tải liệu
        </Button>
      </div>
      <Button color="error" onClick={handleOpenReportPopup} variant="default">
        Báo cáo
      </Button>
    </div>
  );
};
