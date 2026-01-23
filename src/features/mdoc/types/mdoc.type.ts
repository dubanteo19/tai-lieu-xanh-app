export interface MDoc {
  id: number;
  fileName: string;
  fileType: string;
  pages: number;
  downloads: number;
  fileSize: number;
  url: string;
}
export interface PresignedUrl {
  url: string;
}
