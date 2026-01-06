import { IPost } from "@/type/IPost";
import { getThumbUri } from "@/utils/uri";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FC } from "react";
import { Link } from "react-router-dom";
export const FavoritePostItem: FC<IPost> = (post) => {
  return (
    <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
      <Grid container>
        <Grid size={1}>
          <Box component={"img"} width={80} src={getThumbUri(post.thumb)}></Box>
        </Grid>
        <Grid size={9}>
          <Stack>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/post/${post.id}`}
            >
              <Typography variant="h6">{post.title}</Typography>
            </Link>
            <Typography>Ngày đăng: {post.createdDate}</Typography>
          </Stack>
        </Grid>
        <Grid size={2}>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
            }}
            spacing={2}
          >
            <Stack>
              <Stack direction="row" spacing={1}>
                <Typography>{post.author.fullName}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Stack spacing={1} direction="row">
                  <Typography>{post.views}</Typography>
                  <VisibilityIcon />
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography>{post.downloads || 0}</Typography>
                  <DownloadIcon />
                </Stack>
              </Stack>
            </Stack>
            <Button color="error" variant="contained">
              Xóa
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};
