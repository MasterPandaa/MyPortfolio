import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "id" | "en";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "portfolio-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "id" || stored === "en") setLanguageState(stored);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, lang);
  };

  const toggle = () => setLanguage(language === "id" ? "en" : "id");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function t(id: string, en: string, lang: Language) {
  return lang === "id" ? id : en;
}
