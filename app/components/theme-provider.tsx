"use client";

import * as React from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: "dark" | "light";
};

const ThemeContext = React.createContext<{
  theme: "dark" | "light";
}>({
  theme: "dark",
});

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme] = React.useState<"dark" | "light">(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);
