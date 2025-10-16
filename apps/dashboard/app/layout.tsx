import "@byte24/ui/global.css";
import "@repo/ui/globals.css";
import axios from "axios";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Roboto } from "next/font/google";

import { AppProvider } from "@byte24/ui/context";
import { axiosInstance } from "@dashboard/common/api";
import { BRANDING_OVERRIDE } from "@dashboard/constants";
import { PROJECT_DESCRIPTION, PROJECT_NAME } from "@dashboard/constants/server";

const InterFont = Inter({
  subsets: ["latin"],
});
const MerriweatherFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "300", "400", "700"],
  variable: "--font-serif",
});
const JetbrainsMonoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: PROJECT_NAME,
    template: `%s | ${PROJECT_NAME}`,
  },
  description: PROJECT_DESCRIPTION,
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-96x96.png",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "auto",
};

axios.defaults.withCredentials = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body
        className={`${InterFont.className} ${MerriweatherFont.variable} ${JetbrainsMonoFont.variable}`}
      >
        <AppProvider
          axiosInstance={axiosInstance}
          brandingOverride={BRANDING_OVERRIDE}
        >
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
