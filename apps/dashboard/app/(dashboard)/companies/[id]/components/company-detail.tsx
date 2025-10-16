"use client";
import { PageTabs } from "@byte24/ui/components/page-tabs";
import { TitleArea } from "@byte24/ui/components/title-area";
import { StatusBadge } from "@ui/src/components/status-badge";
import { IDetailPageProps } from "@ui/src/interfaces/general";
import { Info, UsersRound } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useGetCompany } from "../../hooks";
import CompanyContactPersons from "./company-contact-persons";
import CompanyInfo from "./company-info";

function CompanysDetail({ id }: IDetailPageProps) {
  // hooks
  const { data: company, isLoading, isPaused } = useGetCompany(id);

  // get url params
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  // states
  const loading = isLoading || isPaused;
  const tabs = [
    {
      id: 1,
      name: "Info",
      icon: <Info className="h-5 w-5 text-primary" />,
      component: CompanyInfo,
    },

    {
      id: 6,
      name: `Contactpersonen`,
      icon: <UsersRound className="h-5 w-5 text-primary" />,
      // component: CompanyPeople,
      component: CompanyContactPersons,
    },
  ];

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-4 md:flex">
        <TitleArea
          title={
            <div className="flex items-center gap-x-2">
              {company?.name}
              {company?.type && (
                <StatusBadge color={company?.type?.color}>
                  {company?.type?.name}
                </StatusBadge>
              )}
            </div>
          }
          info={[
            {
              icon: UsersRound,
              title: `${company?._count?.contactPersons} ${company?._count?.contactPersons === 1 ? "Contactpersoon" : "Contactpersonen"}`,
            },
          ]}
          loading={loading}
        />
        <PageTabs changeTabOrder selectedTab={tab ? +tab : undefined}>
          {tabs?.map((tab, index) => (
            <PageTabs.Tab
              key={tab.id}
              id={index + 1}
              name={tab.name}
              icon={tab.icon}
            >
              {loading === false && <tab.component company={company!} />}
              {loading && <div>Laden...</div>}
            </PageTabs.Tab>
          ))}
        </PageTabs>
      </div>
    </>
  );
}

export default CompanysDetail;
