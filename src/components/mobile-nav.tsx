import { Link, useRouterState } from "@tanstack/react-router";
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

const navItems: MenuItem[] = [
  { to: "/", icon: Home, id: "Home", en: "Home" },
  { to: "/career", icon: Briefcase, id: "Karir", en: "Career" },
  { to: "/projects", icon: Code2, id: "Proyek", en: "Projects" },
  { to: "/ai-data", icon: BrainCircuit, id: "AI", en: "AI" },
  { to: "/achievements", icon: Trophy, id: "Award", en: "Award" },
  { to: "/activities", icon: Camera, id: "Galeri", en: "Gallery" },
  { to: "/contact", icon: Mail, id: "Kontak", en: "Contact" },
];

export function MobileNav() {
  const { language, toggle: toggleLang } = useLanguage();
  const { theme, toggle: toggleTheme } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const langLabel = tr("Bahasa: ID · klik untuk EN", "Language: EN · click for ID", language);
  const themeLabel = tr(
    theme === "light" ? "Tema terang · klik untuk gelap" : "Tema gelap · klik untuk terang",
    theme === "light" ? "Light theme · click for dark" : "Dark theme · click for light",
    language,
  );

  return (
    <nav
      aria-label={tr("Navigasi utama", "Main navigation", language)}
      className="fixed bottom-2 left-2 right-2 z-40 flex items-center justify-around rounded-2xl border border-border/60 bg-card/90 py-1.5 px-1 backdrop-blur-xl shadow-xl md:hidden"
    >
      {/* Nav Links */}
      {navItems.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            aria-label={tr(item.id, item.en, language)}
            className={cn(
              "flex flex-col items-center justify-center rounded-xl py-1.5 px-2 transition-all duration-200",
              active
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className={cn("h-[18px] w-[18px]", active && "drop-shadow-sm")} />
            <span className="mt-0.5 text-[9px] font-medium leading-none">
              {tr(item.id, item.en, language)}
            </span>
          </Link>
        );
      })}

      {/* Divider */}
      <div className="h-7 w-px bg-border/60 mx-0.5" />

      {/* Language Toggle */}
      <button
        type="button"
        onClick={toggleLang}
        aria-label={langLabel}
        className="flex flex-col items-center justify-center rounded-xl py-1.5 px-2 text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-secondary/60"
      >
        <Languages className="h-[18px] w-[18px]" />
        <span className="mt-0.5 text-[9px] font-medium leading-none">
          {language.toUpperCase()}
        </span>
      </button>

      {/* Theme Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={themeLabel}
        className="flex flex-col items-center justify-center rounded-xl py-1.5 px-2 text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-secondary/60"
      >
        {theme === "light" ? (
          <Sun className="h-[18px] w-[18px]" />
        ) : (
          <Moon className="h-[18px] w-[18px]" />
        )}
        <span className="mt-0.5 text-[9px] font-medium leading-none">
          {theme === "light" ? tr("Terang", "Light", language) : tr("Gelap", "Dark", language)}
        </span>
      </button>
    </nav>
  );
}
