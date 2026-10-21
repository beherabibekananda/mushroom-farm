import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      const isDark = media.matches;
      setResolvedTheme(isDark ? "dark" : "light");

      if (isDark) {
        root.classList.add("dark");
        root.classList.remove("light");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.style.colorScheme = "light";
      }
    };

    updateTheme();
    media.addEventListener("change", updateTheme);
    return () => media.removeEventListener("change", updateTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
