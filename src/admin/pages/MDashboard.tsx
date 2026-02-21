import FullLoading from "@/shared/components/full-loading";
import { useGetDashboardInfoQuery } from "../api/dashboardApi";
import { AnalyticsWidgetSummary } from "../components/AnalyticsWidgetSummary";
import { AnalyticsCommentsPublishs } from "../components/chart/AnalyticsComments";
import { AnalyticsDownloadsPublishs } from "../components/chart/AnalyticsDownloads";
import { AnalyticsPostPublishs } from "../components/chart/AnalyticsPostPublishs";
export const MDashboard = () => {
  const { data: dashboardInfo, isLoading } = useGetDashboardInfoQuery();
  if (isLoading) return <FullLoading />;
  return (
    <div>
      <p>Hi, Welcome back 👋</p>
      {dashboardInfo && (
        <div>
          <div>
            <AnalyticsWidgetSummary title="Tổng số lượng tài liệu" total={32} />
          </div>
          <div>
            <AnalyticsWidgetSummary
              title="Tổng người dùng "
              total={dashboardInfo.totalUsers}
            />
          </div>
          <div>
            <AnalyticsWidgetSummary
              title="Tổng số lượng bình luận"
              total={dashboardInfo.totalComments}
            />
          </div>
          <div>
            <AnalyticsWidgetSummary
              title="Tổng số lượt tải"
              total={dashboardInfo.totalDownloads}
            />
          </div>
          <div>
            <AnalyticsPostPublishs
              title="Thống kê tài liệu được xuất bản"
              subheader="(+20%) so với tháng trước"
            />
          </div>

          <div>
            <AnalyticsDownloadsPublishs
              title="Thống kê lượt tải tài liệu"
              subheader="(+30%) so với tháng trước"
            />
          </div>
          <div>
            <AnalyticsCommentsPublishs
              title="Thống kê lượt bình luận"
              subheader="(+10%) so với tháng trước"
            />
          </div>
        </div>
      )}
    </div>
  );
};
