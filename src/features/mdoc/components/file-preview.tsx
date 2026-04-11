import { bytesToMB } from "@/shared/utils/bytesToMB";

interface FilePreviewProps {
  file: File;
}
export const FilePreview = ({ file }: FilePreviewProps) => {
  return (
    <div className="px-4 py-2  rounded border mb-4">
      <p className="break-words">
        File: {file.name} (
        <span className="text-red-800">{bytesToMB(file.size)}</span>)
      </p>
      <p className="break-words">Loại tài liệu: {file.type}</p>
    </div>
  );
};
