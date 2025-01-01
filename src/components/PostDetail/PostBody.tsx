import { Box, Divider, Stack, Typography } from "@mui/material";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { IMDoc } from "../../type/IMDoc";
import Grid from "@mui/material/Grid2";
import { bytesToMB } from "../../utils/bytesToMB";
import { useMemo } from "react";
import { getFileUri } from "../../utils/uri";
interface PostBodyProps {
  description: string;
  postId: number;
  mdoc: IMDoc;
  isLoading: boolean;
}

const MDocProperty = (property: { mkey: string; value: string | number }) => {
  return (
    <Grid container>
      <Grid size={6}>
        <Typography fontWeight="bold">{property.mkey}</Typography>
      </Grid>
      <Grid size={6}>
        <Typography
          sx={{
            wordBreak: "break-all",
          }}
          fontWeight="bold"
          color="success"
        >
          {property.value || 0}
        </Typography>
      </Grid>
    </Grid>
  );
};
export const PostBody: React.FC<PostBodyProps> = ({
  description,
  mdoc,
  isLoading,
}) => {
  const encodeUrl = useMemo(() => encodeURIComponent(mdoc.url), [mdoc.url]);
  const docs = useMemo(
    () => [
      {
        uri: getFileUri(mdoc.url),
      },
    ],
    [encodeUrl],
  );
  const config = {
    header: {
      disableHeader: true,
      disableFileName: true,
      retainURLParams: true,
    },
    csvDelimiter: ",", // "," as default,
    pdfZoom: {
      defaultZoom: 1.1, // 1 as default,
      zoomJump: 0.2, // 0.1 as default,
    },
  };
  return (
    <Box>
      <Stack
        sx={{
          border: "1px solid rgba(0,0,0,0.2)",
          bgcolor: "secondary.main",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Thông tin về tài liệu
        </Typography>
        <MDocProperty mkey="Tên tài liệu:" value={mdoc.fileName} />
        <MDocProperty mkey="Loại tài liệu: " value={mdoc.fileType} />
        <MDocProperty mkey="Kích thước:" value={bytesToMB(mdoc.fileSize)} />
        <MDocProperty mkey="Lươt tải" value={mdoc.downloads} />
        <MDocProperty mkey="Số trang" value={mdoc.pages} />
      </Stack>
      <Stack sx={{ mt: 2 }}>
        <Typography variant="h5">Miêu tả tài liệu</Typography>
        <Typography variant="body1">
          {description || "Tài liệu này không có phần mô tả "}
        </Typography>
      </Stack>
      {!isLoading && (
        <Box
          sx={{
            overflow: "auto", // Allows scrolling when content exceeds height
            minHeight: "500px", // Restricts height to 80% of the viewport
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: 2,
            mt: 2,
          }}
        >
          <DocViewer
            config={config}
            pluginRenderers={DocViewerRenderers}
            documents={docs}
          />
        </Box>
      )}
    </Box>
  );
};
