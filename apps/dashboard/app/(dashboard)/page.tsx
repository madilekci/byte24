import { DashboardLoadingSkeleton } from "@dashboard/components/dashboard-skeleton";
// import DashboardCards from './components/overview-cards';
import { PROJECT_NAME } from "@dashboard/constants/server";
import { ContentLayout } from "@repo/ui/components/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Overzicht`,
  description: `Overzicht van het ${PROJECT_NAME} dashboard`,
};

const OverviewPage = () => {
  return (
    <ContentLayout
      breadcrumb={[
        {
          title: "Dashboard",
          url: "/dashboard",
        },
      ]}
    >
      <DashboardLoadingSkeleton />
    </ContentLayout>
  );
};

export default OverviewPage;
