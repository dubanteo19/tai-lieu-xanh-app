import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AnalyticsWidgetSummary } from "../components/AnalyticsWidgetSummary";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PersonIcon from "@mui/icons-material/Person";
import CommentIcon from "@mui/icons-material/Comment";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { AnalyticsPostPublishs } from "../components/chart/AnalyticsPostPublishs";
import { useGetDashboardInfoQuery } from "../api/dashboardApi";
import FullLoading from "../../components/FullLoading";
import { AnalyticsDownloadsPublishs } from "../components/chart/AnalyticsDownloads";
import { AnalyticsCommentsPublishs } from "../components/chart/AnalyticsComments";
export const MDashboard = () => {
  const { data: dashboardInfo, isLoading } = useGetDashboardInfoQuery();
  return (
    <Container
      sx={{
        px: 5,
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
      }}
    >
      {isLoading && <FullLoading />}
      <Typography variant="h5" sx={{ mb: 3 }} fontWeight="bold">
        Hi, Welcome back 👋
      </Typography>
      {dashboardInfo && (
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
              total={dashboardInfo.totalUsers}
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
              total={dashboardInfo.totalComments}
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
              title="Tổng số lượt tải"
              total={dashboardInfo.totalDownloads}
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
            />
          </Grid>

          <Grid size={12}>
            <AnalyticsDownloadsPublishs
              title="Thống kê lượt tải tài liệu"
              subheader="(+30%) so với tháng trước"
            />
          </Grid>
          <Grid size={12}>
            <AnalyticsCommentsPublishs
              title="Thống kê lượt bình luận"
              subheader="(+10%) so với tháng trước"
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
