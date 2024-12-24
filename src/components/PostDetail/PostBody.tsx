import { Box, Typography } from "@mui/material";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
interface PostBodyProps {
  content: string;
  documents: string[];
}
export const PostBody: React.FC<PostBodyProps> = ({ content }) => {
  const docs = [{ uri: "http://localhost:8080/api/v1/posts/1/download" }];
  return (
    <Box sx={{ py: 2 }}>
      <Typography>{content}</Typography>
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={docs}
      ></DocViewer>
    </Box>
  );
};
