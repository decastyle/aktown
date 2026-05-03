import { createRootRoute, createRoute, Outlet, useRouterState } from '@tanstack/react-router';
import App from "./App";
import BirAuyl from "./components/birauyl";
import { ThemeProvider } from '@/components/theme-provider/theme-provider';
import { LangProvider } from './i18n';
import { useEffect } from 'react';

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LangProvider>
        <Outlet />
      </LangProvider>
    </ThemeProvider>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const birauylRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/birauyl",
  component: BirAuyl,
});

export const routeTree = rootRoute.addChildren([indexRoute, birauylRoute]);
