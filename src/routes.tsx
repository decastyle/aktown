import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import App from "./App";
import BirAuyl from "./components/birauyl";
import { ThemeProvider } from '@/components/theme-provider/theme-provider';
import { LangProvider } from './i18n';

function RootLayout() {
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
