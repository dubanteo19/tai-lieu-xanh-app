import {
  useGetAllReasonsQuery,
  useReportPostMutation,
} from "@/admin/api/reportApi";
import { useLazyGetDocumentPresignedUrlQuery } from "@/api/mDocApi";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useDialog } from "@/hooks/useDialog";
import { downloadFileFromUrl } from "@/utils/downloadFile";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { DownloadDialog } from "./dialogs/DownloadDialog";
import { ReportDialog } from "./dialogs/ReportDialog";

interface PostActionButtonGroupProps {
  postId: number;
}
export const PostActionButtonGroup: FC<PostActionButtonGroupProps> = ({
  postId,
}) => {
  const dispatch = useDispatch();
  const favorite = useAppSelector((state) => state.favorite);
  const { id: userId } = useAppSelector((state) => state.auth);
  const isInFavorite = favorite.some((p) => p.postId === postId);
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
