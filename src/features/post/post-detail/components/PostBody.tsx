import { useGetPreviewUrlsQuery } from "@/features/mdoc/api/mDoc.api";
import { MDoc } from "@/features/mdoc/types/mdoc.type";
import { bytesToMB } from "@/shared/utils/bytesToMB";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import "yet-another-react-lightbox/styles.css";
const MDocProperty = (property: { mkey: string; value: string | number }) => {
  return (
    <div className="grid grid-cols-2">
      <p className="font-bold">{property.mkey}</p>
      <p className="break-all font-bold">{property.value || 0}</p>
    </div>
  );
};
interface PostBodyProps {
  description: string;
  postId: number;
  mdoc: MDoc;
  isLoading: boolean;
}
export const PostBody = ({ description, mdoc }: PostBodyProps) => {
  const { data: previewUrls } = useGetPreviewUrlsQuery(mdoc.id);
  const [index, setIndex] = useState(0);
  const slides = useMemo(() => {
    return (previewUrls || []).map((url) => ({
      src: url,
    }));
  }, [previewUrls]);

  return (
    <div>
      <div className="p-2">
        <h4>Thông tin về tài liệu</h4>
        <MDocProperty mkey="Tên tài liệu:" value={mdoc.fileName} />
        <MDocProperty mkey="Loại tài liệu: " value={mdoc.fileType} />
        <MDocProperty mkey="Kích thước:" value={bytesToMB(mdoc.fileSize)} />
        <MDocProperty mkey="Lượt tải" value={mdoc.downloads} />
        <MDocProperty mkey="Số trang" value={mdoc.pages} />
      </div>
      <div className="flex flex-col">
        <h4>Miêu tả tài liệu</h4>
        <p>{description || "Tài liệu này không có phần mô tả "}</p>
      </div>
      <Lightbox
        plugins={[Inline]}
        index={index}
        slides={slides}
        on={{
          view: ({ index }) => setIndex(index),
        }}
        carousel={{
          padding: 0,
          spacing: 2,
          imageFit: "contain",
        }}
        inline={{
          style: {
            width: "100%",
            maxWidth: "900px",
            aspectRatio: "3 / 2",
            margin: "0 auto",
          },
        }}
      />
    </div>
  );
};
