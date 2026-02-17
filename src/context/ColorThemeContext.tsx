"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type ColorTheme = "teal" | "navy" | "burgundy" | "forest" | "charcoal";

export const colorThemes: Record<ColorTheme, string> = {
  teal: "hsl(168, 60%, 40%)",
  navy: "hsl(220, 60%, 35%)",
  burgundy: "hsl(345, 60%, 35%)",
  forest: "hsl(150, 50%, 30%)",
  charcoal: "hsl(0, 0%, 25%)",
};

const COLOR_STORAGE_KEY = "resumeBuilderColor";

function loadColorFromStorage(): ColorTheme {
  if (typeof window === "undefined") return "teal";
  try {
    const stored = window.localStorage.getItem(COLOR_STORAGE_KEY);
    if (stored && stored in colorThemes) {
      return stored as ColorTheme;
    }
  } catch {
    // Ignore errors
  }
  return "teal";
}

function saveColorToStorage(color: ColorTheme): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COLOR_STORAGE_KEY, color);
  } catch {
    // Ignore storage errors
  }
}

type ColorThemeContextValue = {
  color: ColorTheme;
  colorValue: string;
  setColor: (color: ColorTheme) => void;
};

const ColorThemeContext = createContext<ColorThemeContextValue | null>(null);

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [color, setColorState] = useState<ColorTheme>(() => loadColorFromStorage());

  const setColor = (newColor: ColorTheme) => {
    setColorState(newColor);
    saveColorToStorage(newColor);
  };

  return (
    <ColorThemeContext.Provider
      value={{ color, colorValue: colorThemes[color], setColor }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const ctx = useContext(ColorThemeContext);
  if (!ctx) throw new Error("useColorTheme must be used within ColorThemeProvider");
  return ctx;
}
