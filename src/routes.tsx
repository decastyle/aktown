import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import App from "./App";
import BirAuyl from "./components/birauyl";

const rootRoute = createRootRoute({ component: Outlet });

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
