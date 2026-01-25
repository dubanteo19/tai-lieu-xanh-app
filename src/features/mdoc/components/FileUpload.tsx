import { Button } from "@/shared/ui/button";
import { ChangeEvent } from "react";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}
export const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    try {
      if (file && file.size > 10 * 1024 * 1024) {
        console.log("up file nho thoi");
      }
      onFileChange(file);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>Chỉ chấp nhận tải lên tài liệu có định dạng pdf, docx</p>
      <p>Tài liệu phải có kích thước nhỏ hơn 10MB</p>
      <input
        type="file"
        accept=".pdf, .docx"
        style={{ display: "none" }}
        id="file-upload"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button>Upload File</Button>
      </label>
    </div>
  );
};
