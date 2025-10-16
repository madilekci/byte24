import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@byte24/ui/components/breadcrumb";
import { Icons } from "@byte24/ui/components/icons";
import { Separator } from "@byte24/ui/components/separator";
import { SidebarTrigger } from "@byte24/ui/components/sidebar";
import { ModeToggle } from "@byte24/ui/layout";
import { Fragment, Suspense } from "react";
import { HistoryBackButton } from "./history-back-button";

export function ContentLayout({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb: {
    title: string;
    url: string;
  }[];
}) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex w-full items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <HistoryBackButton />
          <Separator
            orientation="vertical"
            className="mx-2 hidden h-4 md:block"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item, index) => {
                if (index === breadcrumb.length - 1) {
                  return (
                    <BreadcrumbItem key={index}>
                      <BreadcrumbPage>{item.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  );
                }
                return (
                  <Fragment key={item.title}>
                    <BreadcrumbItem
                      key={item.title}
                      className="hidden md:block"
                    >
                      <BreadcrumbLink href={item.url}>
                        {item.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Icons.spinner className="h-14 w-14 fill-muted-foreground" />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </>
  );
}
