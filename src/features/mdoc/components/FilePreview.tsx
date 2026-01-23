import { bytesToMB } from "@/shared/utils/bytesToMB";

interface FilePreviewProps {
  file: File | null;
}
export const FilePreview = ({ file }: FilePreviewProps) => {
  return (
    <div>
      {file && (
        <div>
          <p>Tên tài liệu: {file.name}</p>
          <p>Kích thước: {bytesToMB(file.size)}</p>
          <p>Loại tài liệu: {file.type}</p>
        </div>
      )}
    </div>
  );
};
