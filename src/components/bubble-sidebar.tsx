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

function Bubble({
  children,
  label,
  onClick,
  active,
  size = "md",
  as = "button",
  to,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  size?: "sm" | "md" | "lg";
  as?: "button" | "link";
  to?: string;
}) {
  const dims =
    size === "lg"
      ? "h-16 w-16"
      : size === "sm"
        ? "h-10 w-10"
        : "h-12 w-12";

  const base = cn(
    "group/bubble relative flex items-center justify-center rounded-full",
    "border border-white/40 dark:border-white/15 bg-white/25 dark:bg-black/35 backdrop-blur-xl backdrop-saturate-150 shadow-md",
    "text-foreground/90 transition-all duration-300 ease-out",
    "hover:scale-110 hover:border-accent hover:text-accent hover:bg-white/40 dark:hover:bg-white/15 hover:shadow-lg",
    active &&
      "bg-accent/20 dark:bg-accent/25 text-accent border-accent shadow-lg shadow-accent/30 ring-2 ring-accent/40 ring-offset-2 ring-offset-background",
    dims,
  );

  const content = (
    <>
      {children}
      <span
        className={cn(
          "pointer-events-none absolute left-full ml-3.5 whitespace-nowrap rounded-full",
          "bg-white/30 dark:bg-black/40 border border-white/40 dark:border-white/15 px-3 py-1 text-xs font-bold text-foreground shadow-xl backdrop-blur-xl",
          "opacity-0 -translate-x-2 transition-all duration-200 ease-out",
          "group-hover/bubble:opacity-100 group-hover/bubble:translate-x-0",
        )}
      >
        {label}
      </span>
    </>
  );

  if (as === "link" && to) {
    return (
      <Link to={to} className={base} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base} aria-label={label}>
      {content}
    </button>
  );
}

export function BubbleSidebar() {
  const { language, toggle: toggleLang } = useLanguage();
  const { theme, toggle: toggleTheme } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Visit counting logic
  const [visits, setVisits] = useState({ total: 0, today: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const VISITS_KEY = "portfolio_visits_data";
    const todayStr = new Date().toDateString();

    let data = {
      total: 0,
      today: 0,
      lastVisitDate: "",
    };

    try {
      const stored = localStorage.getItem(VISITS_KEY);
      if (stored) {
        data = JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse visits data", e);
    }

    const sessionKey = "portfolio_session_counted";
    const sessionCounted = sessionStorage.getItem(sessionKey);

    if (!sessionCounted) {
      data.total += 1;
      if (data.lastVisitDate === todayStr) {
        data.today += 1;
      } else {
        data.today = 1;
        data.lastVisitDate = todayStr;
      }

      try {
        localStorage.setItem(VISITS_KEY, JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save visits data", e);
      }
      sessionStorage.setItem(sessionKey, "true");
    }

    setVisits({ total: data.total, today: data.today });
  }, []);

  const langLabel = tr("Bahasa: ID · klik untuk EN", "Language: EN · click for ID", language);
  const themeLabel = tr(
    theme === "light" ? "Tema terang" : "Tema gelap",
    theme === "light" ? "Light theme" : "Dark theme",
    language,
  );

  return (
    <aside
      className={cn(
        "fixed left-4 top-4 bottom-4 z-40 hidden md:flex flex-col items-center gap-3",
        "rounded-full border border-white/30 dark:border-white/10 bg-white/20 dark:bg-black/30 backdrop-blur-xl backdrop-saturate-150",
        "px-2.5 py-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]",
      )}
    >
      {/* Profile */}
      <Link
        to="/"
        aria-label={tr("Profil", "Profile", language)}
        className={cn(
          "group/profile relative flex h-16 w-16 items-center justify-center rounded-full",
          "border-2 border-accent dark:border-accent/35 bg-gradient-to-br from-navy to-navy-deep text-primary-foreground",
          "shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:border-accent",
          "hover:shadow-[0_0_20px_color-mix(in_oklab,var(--accent)_40%,transparent)]",
        )}
      >
        <img src={profileUrl} alt="Muhammad Luthfi Abdillah" className="h-full w-full rounded-full object-cover" />
        <span
          className={cn(
            "pointer-events-none absolute left-full ml-3.5 whitespace-nowrap rounded-full",
            "bg-white/30 dark:bg-black/40 border border-white/40 dark:border-white/15 px-3 py-1 text-xs font-bold text-foreground shadow-xl backdrop-blur-xl",
            "opacity-0 -translate-x-2 transition-all duration-200 ease-out",
            "group-hover/profile:opacity-100 group-hover/profile:translate-x-0",
          )}
        >
          {tr("Profil Saya", "My Profile", language)}
        </span>
      </Link>

      {/* Language + Theme */}
      <div className="flex flex-col items-center gap-2">
        <Bubble label={langLabel} onClick={toggleLang} size="sm">
          <div className="flex items-center gap-0.5 text-[10px] font-extrabold">
            <Languages className="h-3.5 w-3.5" />
            <span>{language.toUpperCase()}</span>
          </div>
        </Bubble>
        <Bubble label={themeLabel} onClick={toggleTheme} size="sm">
          {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Bubble>
      </div>

      {/* Separator */}
      <div className="h-px w-8 bg-white/30 dark:bg-white/15" />

      {/* Menu bubbles */}
      <nav className="flex flex-col items-center gap-2">
        {items.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Bubble
              key={item.to}
              as="link"
              to={item.to}
              label={tr(item.id, item.en, language)}
              active={active}
            >
              <Icon className="h-5 w-5" />
            </Bubble>
          );
        })}
      </nav>

      {/* Spacer to push stats to the bottom */}
      <div className="flex-1" />

      {/* Separator */}
      <div className="h-px w-8 bg-white/30 dark:bg-white/15" />

      {/* Micro Visit Stats */}
      <div className="flex flex-col items-center select-none pb-1">
        <div className="flex flex-col items-center gap-2">
          {/* Today */}
          <div className="flex flex-col items-center" title={tr("Kunjungan Hari Ini", "Visits Today", language)}>
            <span className="text-[10px] font-extrabold text-accent leading-none">{visits.today}</span>
            <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mt-0.5">
              {tr("Hari Ini", "Today", language)}
            </span>
          </div>

          {/* Micro divider */}
          <div className="h-1.5 w-px bg-white/30 dark:bg-white/15" />

          {/* Total */}
          <div className="flex flex-col items-center" title={tr("Total Kunjungan", "Total Visits", language)}>
            <span className="text-[10px] font-extrabold text-foreground/80 leading-none">{visits.total}</span>
            <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mt-0.5">
              {tr("Total", "Total", language)}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
