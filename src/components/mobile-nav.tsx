import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
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
  MoreHorizontal,
} from "lucide-react";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";

type MenuItem = {
  to: string;
  icon: typeof Home;
  id: string;
  en: string;
};

// Primary tabs shown always in dock
const primaryItems: MenuItem[] = [
  { to: "/", icon: Home, id: "Beranda", en: "Home" },
  { to: "/career", icon: Briefcase, id: "Karir", en: "Career" },
  { to: "/projects", icon: Code2, id: "Proyek", en: "Projects" },
  { to: "/ai-data", icon: BrainCircuit, id: "AI & Data", en: "AI & Data" },
];

// Secondary items shown in the "More" popup
const moreItems: MenuItem[] = [
  { to: "/achievements", icon: Trophy, id: "Pencapaian", en: "Achievements" },
  { to: "/activities", icon: Camera, id: "Aktivitas", en: "Activities" },
  { to: "/contact", icon: Mail, id: "Kontak", en: "Contact" },
];

export function MobileNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const { language, toggle: toggleLang } = useLanguage();
  const { theme, toggle: toggleTheme } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Check if current path is in secondary items
  const secondaryActive = moreItems.some((item) =>
    item.to === "/" ? pathname === "/" : pathname.startsWith(item.to),
  );

  return (
    <>
      {/* More Popup — floats above dock */}
      {moreOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setMoreOpen(false)}
            aria-hidden="true"
          />

          {/* Popup card */}
          <div className="fixed bottom-20 left-3 right-3 z-50 md:hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="rounded-2xl border border-border/70 bg-card/95 p-4 shadow-2xl backdrop-blur-xl">
              {/* Nav links */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {moreItems.map((item) => {
                  const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 rounded-xl py-4 px-2 transition-all duration-200",
                        active
                          ? "bg-accent text-accent-foreground shadow-sm"
                          : "bg-secondary/40 text-foreground/80 hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-[11px] font-medium leading-none text-center">
                        {tr(item.id, item.en, language)}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-border/50 mb-4" />

              {/* Language & Theme toggles */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={toggleLang}
                  aria-label={tr("Ganti bahasa", "Toggle language", language)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background/60 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent"
                >
                  <Languages className="h-4 w-4" />
                  <span>{language === "id" ? "Bahasa ID" : "English"}</span>
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={tr("Ganti tema", "Toggle theme", language)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background/60 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent"
                >
                  {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span>{theme === "light" ? tr("Terang", "Light", language) : tr("Gelap", "Dark", language)}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom Dock */}
      <nav
        aria-label={tr("Navigasi utama", "Main navigation", language)}
        className="fixed bottom-3 left-3 right-3 z-40 flex items-center justify-around rounded-2xl border border-border/60 bg-card/95 py-2 px-1 backdrop-blur-xl shadow-xl md:hidden"
      >
        {/* Primary nav items */}
        {primaryItems.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMoreOpen(false)}
              aria-label={tr(item.id, item.en, language)}
              className={cn(
                "flex flex-col items-center justify-center rounded-xl py-2 px-4 transition-all duration-200 min-w-[56px]",
                active
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="mt-1 text-[10px] font-medium leading-none">
                {tr(item.id, item.en, language)}
              </span>
            </Link>
          );
        })}

        {/* More button */}
        <button
          type="button"
          onClick={() => setMoreOpen(!moreOpen)}
          aria-label={tr("Lebih banyak menu", "More menu", language)}
          aria-expanded={moreOpen}
          className={cn(
            "flex flex-col items-center justify-center rounded-xl py-2 px-4 transition-all duration-200 min-w-[56px]",
            (moreOpen || secondaryActive)
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="mt-1 text-[10px] font-medium leading-none">
            {tr("Lainnya", "More", language)}
          </span>
        </button>
      </nav>
    </>
  );
}
