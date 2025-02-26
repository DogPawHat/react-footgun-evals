import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";
import type { QueryClient } from "@tanstack/react-query";
import * as React from "react";
import "../styles/app.css";
import { ThemeProvider } from "../components/theme-provider";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <div className="flex min-h-screen flex-col bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <div className="mr-4 flex">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold">React Footgun Evals</span>
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <nav className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  to="/"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  About
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t bg-background">
          <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} React Footgun Evals. All
                rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Terms
              </Link>
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Privacy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>React Footgun Evals</title>
        <meta
          name="description"
          content="Evaluations of programming prompts to help identify outdated or incorrect information"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
        <ReactQueryDevtools />
        <TanStackRouterDevtools />
        <Scripts />
      </body>
    </html>
  );
}
