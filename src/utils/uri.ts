import NoImage from "../assets/No-Image-Placeholder.svg";
export const getThumbUri = (uri: string) => {
  if (uri) {
    const encodeUrl = encodeURIComponent("/" + uri);
    return `http://192.168.100.167:8080/api/v1/documents/download-thumb?uri=${encodeUrl}`;
  }
  return NoImage;
};
