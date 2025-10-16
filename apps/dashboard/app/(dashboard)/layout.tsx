"use client";
import { SidebarInset } from "@byte24/ui/components/sidebar";
import { DashboardProvider } from "@byte24/ui/context";
import { AppSidebar } from "@byte24/ui/layout";
import { SIDEBAR_GROUPS } from "@dashboard/constants/sidebar";
import { SettingsIcon } from "lucide-react";
import { useLogoutUser } from "./hooks";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider
      //@ts-ignore
      useLogoutUser={useLogoutUser}
      splashScreenOverride={{
        logo: "/images/logo.png",
        logoWidth: 500,
        logoHeight: 500,
      }}
    >
      <AppSidebar
        groups={SIDEBAR_GROUPS}
        footer={{
          groups: [
            [
              {
                icon: SettingsIcon,
                title: "Instellingen",
                href: "/settings",
              },
            ],
          ],
        }}
      />
      <SidebarInset>{children}</SidebarInset>
    </DashboardProvider>
  );
}
