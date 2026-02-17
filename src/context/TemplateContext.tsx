"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { TemplateType } from "@/lib/template-types";

const TEMPLATE_STORAGE_KEY = "resumeBuilderTemplate";

function loadTemplateFromStorage(): TemplateType {
  if (typeof window === "undefined") return "classic";
  try {
    const stored = window.localStorage.getItem(TEMPLATE_STORAGE_KEY);
    if (stored && (stored === "classic" || stored === "modern" || stored === "minimal")) {
      return stored as TemplateType;
    }
  } catch {
    // Ignore errors
  }
  return "classic";
}

function saveTemplateToStorage(template: TemplateType): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TEMPLATE_STORAGE_KEY, template);
  } catch {
    // Ignore storage errors
  }
}

type TemplateContextValue = {
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
};

const TemplateContext = createContext<TemplateContextValue | null>(null);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplateState] = useState<TemplateType>(() =>
    loadTemplateFromStorage()
  );

  const setTemplate = (newTemplate: TemplateType) => {
    setTemplateState(newTemplate);
    saveTemplateToStorage(newTemplate);
  };

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error("useTemplate must be used within TemplateProvider");
  return ctx;
}
