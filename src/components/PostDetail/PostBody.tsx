import { Box, Divider, Stack, Typography } from "@mui/material";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { IMDoc } from "../../type/IMDoc";
import Grid from "@mui/material/Grid2";
interface PostBodyProps {
  description: string;
  postId: number;
  mdoc: IMDoc;
}

const MDocProperty = (property: { mkey: string; value: string | number }) => {
  return (
    <Grid container>
      <Grid size={6}>
        <Typography fontWeight="bold">{property.mkey}</Typography>
      </Grid>
      <Grid size={6}>
        <Typography fontWeight="bold" color="success">
          {property.value}
        </Typography>
      </Grid>
    </Grid>
  );
};
export const PostBody: React.FC<PostBodyProps> = ({ description, mdoc }) => {
  const docs = [{ uri: `http://localhost:8080/api/v1/documents/${mdoc.url}` }];

  return (
    <Box sx={{ p: 2 }}>
      <Typography>{description}</Typography>
      <Stack
        sx={{
          border: "1px solid rgba(0,0,0,0.2)",
          bgcolor: "secondary.main",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Thong tin ve tai lieu
        </Typography>
        <MDocProperty mkey="Ten tai lieu:" value={mdoc.fileName} />
        <MDocProperty mkey="Loại tài liệu: " value={mdoc.fileType} />
        <MDocProperty mkey="Kich thuoc:" value={mdoc.fileSize} />
        <MDocProperty mkey="Luot tai" value={mdoc.downloads} />
        <MDocProperty mkey="So trang" value={mdoc.pages} />
      </Stack>
      <Stack sx={{ mt: 2 }}>
        <Typography variant="h5">Mieu ta tai lieu</Typography>
        <Typography variant="body1">
          {description || "Tai lieu nay khong co mieu ta "}
        </Typography>
      </Stack>
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={docs}
      ></DocViewer>
    </Box>
  );
};
