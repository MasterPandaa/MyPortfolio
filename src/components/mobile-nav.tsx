import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Home,
  Briefcase,
  Code2,
  BrainCircuit,
  Trophy,
  Camera,
  Mail,
  Sun,
  Moon,
  Languages,
  Menu,
  X,
} from "lucide-react";
import profileUrl from "@/assets/profile.jpg?url";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";

type MenuItem = {
  to: string;
  icon: typeof Home;
  id: string;
  en: string;
};

const items: MenuItem[] = [
  { to: "/", icon: Home, id: "Beranda", en: "Home" },
  { to: "/career", icon: Briefcase, id: "Karir", en: "Career" },
  { to: "/projects", icon: Code2, id: "Proyek", en: "Projects" },
  { to: "/ai-data", icon: BrainCircuit, id: "AI & Data", en: "AI & Data" },
  { to: "/achievements", icon: Trophy, id: "Pencapaian", en: "Achievements" },
  { to: "/activities", icon: Camera, id: "Aktivitas", en: "Activities" },
  { to: "/contact", icon: Mail, id: "Kontak", en: "Contact" },
];

// High frequency bottom bar items
const bottomItems: MenuItem[] = [
  { to: "/", icon: Home, id: "Beranda", en: "Home" },
  { to: "/career", icon: Briefcase, id: "Karir", en: "Career" },
  { to: "/projects", icon: Code2, id: "Proyek", en: "Projects" },
  { to: "/ai-data", icon: BrainCircuit, id: "AI & Data", en: "AI & Data" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggle: toggleLang } = useLanguage();
  const { theme, toggle: toggleTheme } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Visit counting logic synced with localStorage
  const [visits, setVisits] = useState({ total: 0, today: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const VISITS_KEY = "portfolio_visits_data";
    try {
      const stored = localStorage.getItem(VISITS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setVisits({ total: parsed.total || 0, today: parsed.today || 0 });
      }
    } catch (e) {
      console.error("Failed to read visits data", e);
    }
  }, [isOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const langLabel = tr("Bahasa: ID · klik untuk EN", "Language: EN · click for ID", language);
  const themeLabel = tr(
    theme === "light" ? "Tema terang" : "Tema gelap",
    theme === "light" ? "Light theme" : "Dark theme",
    language,
  );

  return (
    <>
      {/* Mobile Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between border-b border-border/50 bg-background/80 px-4 py-2.5 backdrop-blur-md md:hidden">
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2.5"
          aria-label={tr("Beranda", "Home", language)}
        >
          <img
            src={profileUrl}
            alt="Muhammad Luthfi Abdillah"
            className="h-9 w-9 rounded-full border border-accent/80 object-cover shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-foreground">
              M. Luthfi Abdillah
            </span>
            <span className="text-[10px] font-medium text-accent">
              AI & QA Developer
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={langLabel}
            className="flex h-8 items-center gap-1 rounded-full border border-border bg-card/80 px-2.5 text-[11px] font-semibold text-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Languages className="h-3.5 w-3.5" />
            <span>{language.toUpperCase()}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? tr("Tutup Menu", "Close Menu", language) : tr("Buka Menu", "Open Menu", language)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-accent text-accent-foreground shadow-xs transition-transform active:scale-95"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Floating Bottom Dock Navigation for Mobile */}
      <nav className="fixed bottom-3 left-3 right-3 z-40 flex items-center justify-around rounded-2xl border border-border/70 bg-card/85 py-2 px-2 backdrop-blur-lg shadow-lg md:hidden">
        {bottomItems.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex flex-col items-center justify-center rounded-xl py-1 px-3 transition-all duration-200",
                active
                  ? "bg-accent text-accent-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] mt-0.5">{tr(item.id, item.en, language)}</span>
            </Link>
          );
        })}

        {/* Menu Drawer Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex flex-col items-center justify-center rounded-xl py-1 px-3 transition-all duration-200",
            isOpen
              ? "bg-accent text-accent-foreground font-semibold shadow-xs"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Menu className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">{tr("Menu", "Menu", language)}</span>
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-background/80 backdrop-blur-md md:hidden animate-in fade-in duration-200">
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-3xl border-t border-border bg-card p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div className="flex items-center gap-3">
                <img
                  src={profileUrl}
                  alt="Muhammad Luthfi Abdillah"
                  className="h-10 w-10 rounded-full border-2 border-accent object-cover shadow-sm"
                />
                <div>
                  <h2 className="text-base font-bold text-foreground">Navigasi Portfolio</h2>
                  <p className="text-xs text-muted-foreground">
                    {tr("Pilih halaman yang ingin dikunjungi", "Select a page to visit", language)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Menu Links Grid */}
            <div className="mt-4 grid grid-cols-1 gap-2">
              {items.map((item) => {
                const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3.5 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200",
                      active
                        ? "border-accent bg-accent text-accent-foreground font-semibold shadow-xs"
                        : "border-border/60 bg-background/60 text-foreground hover:bg-accent/10 hover:border-accent/40",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        active ? "bg-accent-foreground/20 text-accent-foreground" : "bg-accent/10 text-accent",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="flex-1">{tr(item.id, item.en, language)}</span>
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions & Stats */}
            <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={toggleLang}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground"
                >
                  <Languages className="h-3.5 w-3.5" />
                  <span>{language === "id" ? "Bahasa: ID" : "Language: EN"}</span>
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground"
                >
                  {theme === "light" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                  <span>{theme === "light" ? "Light" : "Dark"}</span>
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 text-right">
                <div>
                  <p className="text-[10px] font-bold text-accent">{visits.today}</p>
                  <p className="text-[8px] uppercase tracking-wider text-muted-foreground">Hari Ini</p>
                </div>
                <div className="h-4 w-px bg-border/60" />
                <div>
                  <p className="text-[10px] font-bold text-foreground">{visits.total}</p>
                  <p className="text-[8px] uppercase tracking-wider text-muted-foreground">Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
