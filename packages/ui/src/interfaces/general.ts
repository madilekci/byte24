export interface IPageProps {
  params: Promise<{ id: string; [key: string]: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export interface IDetailPageProps {
  id: number;
}
