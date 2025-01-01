import NoImage from "../assets/No-Image-Placeholder.svg";
const baseUrl = import.meta.env.VITE_BASE_URL;
export const getThumbUri = (uri: string) => {
  if (uri) {
    const encodeUrl = encodeURIComponent("/" + uri);
    return `${baseUrl}/api/v1/documents/download-thumb?uri=${encodeUrl}`;
  }
  return NoImage;
};
export const getFileUri = (uri: string) => {
  if (uri) {
    const encodeUrl = encodeURIComponent("/" + uri);
    return `${baseUrl}/api/v1/documents/download?uri=${encodeUrl}`;
  }
  return NoImage;
};
