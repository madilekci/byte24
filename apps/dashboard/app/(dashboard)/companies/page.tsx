import { CompaniesLoadingSkeleton } from "@dashboard/components/dashboard-skeleton";
// import { ContentLayout } from '@repo/ui/components/content-layout';
import { ContentLayout } from "@repo/ui/components/content-layout";
import { Metadata } from "next";
import { Suspense } from "react";
import Companies from "./components/companies";

export const metadata: Metadata = {
  title: `Bedrijven`,
  description: "Overzicht van alle bedrijven",
};

const CompaniesPage = () => {
  return (
    <ContentLayout
      breadcrumb={[
        {
          title: "Bedrijf",
          url: "/companies",
        },
      ]}
    >
      <Suspense fallback={<CompaniesLoadingSkeleton />}>
        <Companies />
      </Suspense>
    </ContentLayout>
  );
};

export default CompaniesPage;
