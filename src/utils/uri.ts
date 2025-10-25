const baseUrl = import.meta.env.VITE_BASE_URL;
const NO_IMAGE = "assets/no-image.svg";
export const getThumbUri = (uri: string) => {
  if (uri) {
    const encodeUrl = encodeURIComponent("/" + uri);
    return `${baseUrl}/api/v1/documents/download-thumb?uri=${encodeUrl}`;
  }
  return NO_IMAGE;
};
export const getFileUri = (uri: string) => {
  if (uri) {
    const encodeUrl = encodeURIComponent("/" + uri);
    return `${baseUrl}/api/v1/documents/download?uri=${encodeUrl}`;
  }
  return NO_IMAGE;
};
