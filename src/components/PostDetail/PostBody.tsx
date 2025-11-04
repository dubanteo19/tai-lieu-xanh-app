import "@cyntler/react-doc-viewer/dist/index.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";
import { FC } from "react";
import { IMDoc } from "../../type/IMDoc";
import { bytesToMB } from "../../utils/bytesToMB";
import { useGetPreviewUrlsQuery } from "@/api/mDocApi";
import { ImageHolder } from "../ui/image-holder";
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
  mdoc: IMDoc;
  isLoading: boolean;
}
export const PostBody: FC<PostBodyProps> = ({ description, mdoc }) => {
  const { data: previewUrls, isLoading } = useGetPreviewUrlsQuery(mdoc.id);
  return (
    <div>
      <div className="p-2">
        <h5>Thông tin về tài liệu</h5>
        <MDocProperty mkey="Tên tài liệu:" value={mdoc.fileName} />
        <MDocProperty mkey="Loại tài liệu: " value={mdoc.fileType} />
        <MDocProperty mkey="Kích thước:" value={bytesToMB(mdoc.fileSize)} />
        <MDocProperty mkey="Lươt tải" value={mdoc.downloads} />
        <MDocProperty mkey="Số trang" value={mdoc.pages} />
      </div>
      <div className="flex flex-col">
        <h4>Miêu tả tài liệu</h4>
        <p>{description || "Tài liệu này không có phần mô tả "}</p>
      </div>
      {!isLoading && previewUrls && (
        <div className="flex gap-2 flex-col">
          {previewUrls.map((url) => (
            <ImageHolder src={url} key={url} />
          ))}
        </div>
      )}
      {/* {!isLoading && (
         <DocViewer
          config={config}
          pluginRenderers={DocViewerRenderers}
          documents={docs}
        /> 
      )} */}
    </div>
  );
};
