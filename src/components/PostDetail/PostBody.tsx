import { Box, Typography } from "@mui/material";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import doc from "./reactjs_tutorial.pdf";
import "@cyntler/react-doc-viewer/dist/index.css";
interface PostBodyProps {
  content: string;
  documents: string[];
}
export const PostBody: React.FC<PostBodyProps> = ({ content }) => {
  const docs = [{ uri: doc }];
  return (
    <Box>
      <Typography>{content}</Typography>
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={docs}
      ></DocViewer>
    </Box>
  );
};
