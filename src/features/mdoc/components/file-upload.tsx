import { cn } from "@/lib/utils";
import { UploadCloudIcon } from "lucide-react";
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
    <div className="border-primary border-1 py-2 px-4 rounded my-2 w-full">
      <p>Chỉ chấp nhận tải lên tài liệu có định dạng pdf, docx</p>
      <p>Tài liệu phải có kích thước nhỏ hơn 10MB</p>
      <input
        type="file"
        accept=".pdf "
        className="hidden"
        id="file-upload"
        onChange={handleFileChange}
      />
      <label
        className={cn(
          "group relative flex-center border border-dashed border-1 w-full h-24 p-4 rounded bg-primary/20",
          "hover:bg-muted/10 hover:border-primary",
          "transition-all cursor-pointer",
        )}
        htmlFor="file-upload"
      >
        <div className="flex-col-center ">
          <div
            className={cn(
              "rounded bg-primary/20 text-primary rounded-full p-3 ",
              "group-hover:scale-110 transition-transform ",
            )}
          >
            <UploadCloudIcon size={22} />
          </div>
          <p className="text-sm font-semibold ">Click to upload</p>
        </div>
      </label>
    </div>
  );
};
