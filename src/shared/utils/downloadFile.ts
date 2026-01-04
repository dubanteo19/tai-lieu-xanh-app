export const downloadFileFromUrl = (url: string) => {
  const link = document.createElement("a");
  link.href = url;
  document.body.append(link);
  link.click();
  link.remove();
};
