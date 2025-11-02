import {
  useGetAllReasonsQuery,
  useReportPostMutation,
} from "@/admin/api/reportApi";
import { useLazyGetDocumentPresignedUrlQuery } from "@/api/mDocApi";
import { useAppSelector } from "@/hooks/useAppSelector";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

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
  const [reason, setReason] = useState<string>("SPAM");
  const { data: reasons } = useGetAllReasonsQuery();
  const [reportPost, { isLoading, isSuccess, isError }] =
    useReportPostMutation();
  const handleClickOpen = () => {};

  const handleReportPost = async (postId: number) => {
    try {
      await reportPost({
        postId,
        userId,
        reason,
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {};
  const [triggerGetPresignedUrl, { data: presignedUrl, isFetching }] =
    useLazyGetDocumentPresignedUrlQuery();
  const [openDownloadPopup, setOpenDownloadPopup] = useState<boolean>(false);
  const handleOpenDownloadPopup = () => {
    setOpenDownloadPopup(true);
    triggerGetPresignedUrl(postId);
  };
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div>
          <Button>Love</Button>
        </div>
        <Button onClick={handleOpenDownloadPopup} color="warning">
          Tải tải liệu
        </Button>
      </div>
      <Button color="error" onClick={handleClickOpen} variant="default">
        Báo cáo
      </Button>
    </div>
  );
};
