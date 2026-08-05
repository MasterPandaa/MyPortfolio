import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { reportError } from "../lib/error-reporting";
import { LanguageProvider } from "../contexts/language-context";
import { ThemeProvider } from "../contexts/theme-context";
import { BubbleSidebar } from "../components/bubble-sidebar";
import { MobileNav } from "../components/mobile-nav";
import { GridBackground } from "../components/grid-background";
import { NotFoundComponent, ErrorComponent } from "../components/route-error-boundary";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

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
