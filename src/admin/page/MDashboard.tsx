import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AnalyticsWidgetSummary } from "../components/AnalyticsWidgetSummary";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PersonIcon from "@mui/icons-material/Person";
import CommentIcon from "@mui/icons-material/Comment";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { AnalyticsPostPublishs } from "../components/chart/AnalyticsPostPublishs";
export const MDashboard = () => {
  return (
    <Container
      sx={{
        px: 5,
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }} fontWeight="bold">
        Hi, Welcome back 👋
      </Typography>
      <Grid container spacing={3}>
        <Grid size={3}>
          <AnalyticsWidgetSummary
            title="Tổng số lượng tài liệu"
            total={32}
            icon={
              <TextSnippetIcon
                sx={{
                  width: 48,
                  height: 48,
                  color: "primary",
                  mb: 3,
                  zIndex: 100,
                }}
              />
            }
          />
        </Grid>

        <Grid size={3}>
          <AnalyticsWidgetSummary
            title="Tổng người dùng "
            total={434}
            color="secondary"
            icon={
              <PersonIcon
                sx={{
                  width: 48,
                  height: 48,
                  mb: 3,
                }}
              />
            }
          />
        </Grid>
        <Grid size={3}>
          <AnalyticsWidgetSummary
            title="Tổng số lượng bình luận"
            total={714000}
            color="warning"
            icon={
              <CommentIcon
                sx={{
                  width: 48,
                  height: 48,
                  mb: 3,
                }}
              />
            }
          />
        </Grid>

        <Grid size={3}>
          <AnalyticsWidgetSummary
            title="Lượt tải hàng tuần"
            total={714000}
            color="error"
            icon={
              <CloudDownloadIcon
                sx={{
                  width: 48,
                  height: 48,
                  mb: 3,
                }}
              />
            }
          />
        </Grid>
        <Grid size={12}>
          <AnalyticsPostPublishs
            title="Thống kê tài liệu được xuất bản"
            subheader="(+20%) so với tháng trước"
            data={[
              { name: "09/10/2024", posts: 120 },
              { name: "10/10/2024", posts: 100 },
              { name: "11/10/2024", posts: 150 },
              { name: "12/10/2024", posts: 200 },
              { name: "13/10/2024", posts: 180 },
              { name: "14/10/2024", posts: 90 },
              { name: "15/10/2024", posts: 250 },
              { name: "16/10/2024", posts: 300 },
              { name: "17/10/2024", posts: 170 },
              { name: "18/10/2024", posts: 110 },
              { name: "19/10/2024", posts: 130 },
              { name: "20/10/2024", posts: 140 },
              { name: "21/10/2024", posts: 190 },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
