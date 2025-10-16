import { API_URL, RoutePath } from "@dashboard/constants/server";
import { ContentLayout } from "@repo/ui/components/content-layout";
import { IPageProps } from "@ui/src/interfaces/general";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CompanysDetail from "./components/company-detail";

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const data = await getCompanyMetadata(id);

    if (!data) return notFound();

    return {
      title: { absolute: `${data?.name} | Bedrijven` },
      description: `Bedrijf ${data?.number} - ${data?.name}`,
    };
  } catch (error) {
    return notFound();
  }
}

async function getCompanyMetadata(id: string) {
  try {
    const data = await fetch(`${API_URL}/${RoutePath.COMPANY}/${id}/metadata`, {
      method: "GET",
      headers: {
        "X-API-KEY": `${process.env.API_KEY}`,
      },
    }).then((res) => res.json());

    if (data?.statusCode && data?.statusCode !== 200) return notFound();

    return data;
  } catch (error) {
    return null;
  }
}

export default async function CompanyDetailPage({ params }: IPageProps) {
  const { id } = await params;

  const companyMetadata = await getCompanyMetadata(id);

  return (
    <ContentLayout
      breadcrumb={[
        {
          title: "Bedrijven",
          url: "/companies",
        },
        {
          title: `Bedrijf ${companyMetadata?.id}`,
          url: `/companies/${id}`,
        },
      ]}
    >
      <CompanysDetail id={+id} />
    </ContentLayout>
  );
}
