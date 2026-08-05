import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { LanguageProvider } from "../contexts/language-context";
import { ThemeProvider } from "../contexts/theme-context";
import { BubbleSidebar } from "../components/bubble-sidebar";
import { MobileNav } from "../components/mobile-nav";
import { GridBackground } from "../components/grid-background";
import { NotFoundComponent, ErrorComponent } from "../components/route-error-boundary";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Portfolio IT Professional" },
      {
        name: "description",
        content:
          "Portfolio profesional IT — pengalaman kerja, web project, AI & ML, sertifikat, jurnal, aktivitas, dan kontak.",
      },
      { property: "og:title", content: "Portfolio IT Professional" },
      {
        property: "og:description",
        content:
          "Portfolio profesional IT — pengalaman kerja, web project, AI & ML, sertifikat, jurnal, aktivitas, dan kontak.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-transparent text-foreground relative z-0">
            <GridBackground />
            <BubbleSidebar />
            <MobileNav />
            <main className="px-3 pt-4 pb-20 md:pl-28 md:pr-8 md:py-6">
              <Outlet />
            </main>
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
