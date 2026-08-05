import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
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
  ChevronUp,
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

const menuItems: MenuItem[] = [
  { to: "/", icon: Home, id: "Beranda", en: "Home" },
  { to: "/career", icon: Briefcase, id: "Karir", en: "Career" },
  { to: "/projects", icon: Code2, id: "Proyek", en: "Projects" },
  { to: "/ai-data", icon: BrainCircuit, id: "AI & Data", en: "AI & Data" },
  { to: "/achievements", icon: Trophy, id: "Pencapaian", en: "Achievements" },
  { to: "/activities", icon: Camera, id: "Aktivitas", en: "Activities" },
  { to: "/contact", icon: Mail, id: "Kontak", en: "Contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { language, toggle: toggleLang } = useLanguage();
  const { theme, toggle: toggleTheme } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Deteksi ketika layar tidak bergerak / idle selama 2 detik untuk menampilkan label "Klik Disini"
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      setShowHint(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowHint(true);
      }, 2000); // 2 detik idle
    };

    // Timer awal saat komponen di-mount
    timer = setTimeout(() => {
      setShowHint(true);
    }, 2000);

    window.addEventListener("scroll", resetTimer, { passive: true });
    window.addEventListener("touchstart", resetTimer, { passive: true });
    window.addEventListener("touchmove", resetTimer, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("touchmove", resetTimer);
    };
  }, []);

  // Cari index item menu yang sedang aktif
  const activeIndex = useMemo(() => {
    const idx = menuItems.findIndex((item) =>
      item.to === "/" ? pathname === "/" : pathname.startsWith(item.to),
    );
    return idx !== -1 ? idx : 0;
  }, [pathname]);

  const activeItem = menuItems[activeIndex];
  const ActiveIcon = activeItem.icon;
  const activeLabel = tr(activeItem.id, activeItem.en, language);

  // Kalkulasi posisi radial arc (7 item menyebar dari sudut -78° s.d. +78°, radius 150px)
  const radialPositions = useMemo(() => {
    const total = menuItems.length;
    const radius = 150; // Radius busur (px)
    const startAngle = -78;
    const endAngle = 78;
    const step = (endAngle - startAngle) / (total - 1);

    return menuItems.map((_, i) => {
      const angle = startAngle + i * step;
      const rad = (angle * Math.PI) / 180;
      const x = Math.round(radius * Math.sin(rad));
      const y = Math.round(-radius * Math.cos(rad));
      return { x, y };
    });
  }, []);

  const isHintVisible = showHint && !isOpen;

  return (
    <>
      {/* Backdrop saat menu radial terbuka */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-xs transition-opacity duration-300 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Container */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center md:hidden">
        {/* Container Ikon Radial & Toggle Buttons */}
        <div className="relative flex items-center justify-center">

          {/* 7 Ikon Menu Lingkaran Glassmorphism (Tanpa Text Label) */}
          {menuItems.map((item, i) => {
            const isActive = i === activeIndex;
            const Icon = item.icon;
            const label = tr(item.id, item.en, language);
            const pos = radialPositions[i];

            return (
              <div
                key={item.to}
                className="absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center"
                style={{
                  transform: isOpen
                    ? `translate(${pos.x}px, ${pos.y}px) scale(1)`
                    : "translate(0px, 0px) scale(0.2)",
                  opacity: isOpen ? 1 : 0,
                  pointerEvents: isOpen ? "auto" : "none",
                  transitionDelay: isOpen
                    ? `${i * 35}ms`
                    : `${(menuItems.length - 1 - i) * 25}ms`,
                }}
              >
                {/* Lingkaran Tombol Menu (Glassmorphism 56px / h-14 w-14) */}
                <Link
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  aria-label={label}
                  title={label}
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 active:scale-95",
                    isActive
                      ? "bg-accent text-accent-foreground ring-4 ring-accent/30 shadow-accent/40 scale-110 border border-accent"
                      : "border border-white/40 dark:border-white/15 bg-white/25 dark:bg-black/35 text-foreground/90 backdrop-blur-xl backdrop-saturate-150 hover:bg-white/40 dark:hover:bg-white/15 hover:text-accent hover:border-accent/60",
                  )}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              </div>
            );
          })}

          {/* Quick Toggle Controls (Bahasa & Tema) berbentuk LINGKARAN Glassmorphism */}
          <div
            className="absolute transition-all duration-300 ease-out flex items-center gap-3.5 z-30"
            style={{
              transform: isOpen
                ? "translate(0px, -66px) scale(1)"
                : "translate(0px, 0px) scale(0.4)",
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
              transitionDelay: isOpen ? "220ms" : "0ms",
            }}
          >
            {/* Tombol Lingkaran Bahasa */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={tr("Ganti bahasa", "Toggle language", language)}
              title={tr("Ganti bahasa", "Toggle language", language)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 dark:border-white/15 bg-white/25 dark:bg-black/35 text-foreground shadow-lg backdrop-blur-xl backdrop-saturate-150 transition-all duration-200 hover:bg-white/40 dark:hover:bg-white/15 hover:text-accent active:scale-95 text-xs font-extrabold"
            >
              <Languages className="h-5 w-5" />
            </button>

            {/* Tombol Lingkaran Tema */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={tr("Ganti tema", "Toggle theme", language)}
              title={tr("Ganti tema", "Toggle theme", language)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 dark:border-white/15 bg-white/25 dark:bg-black/35 text-foreground shadow-lg backdrop-blur-xl backdrop-saturate-150 transition-all duration-200 hover:bg-white/40 dark:hover:bg-white/15 hover:text-accent active:scale-95"
            >
              {theme === "light" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Outer Wrapper untuk Tombol Utama Menu & Label Hint "Klik Disini" */}
        <div className="relative flex flex-col items-center">
          {/* Label Hint "Klik Disini" (Glassmorphism Transparan, Teks Biru, Animasi Bernafas/Pulse) */}
          <div
            className={cn(
              "absolute -top-7.5 whitespace-nowrap rounded-full border border-white/40 dark:border-white/15 bg-white/25 dark:bg-black/35 px-3.5 py-0.5 text-[11px] font-extrabold text-accent shadow-xl backdrop-blur-xl transition-opacity duration-300 pointer-events-none z-40 tracking-wide",
              isHintVisible ? "opacity-100 animate-pulse" : "opacity-0",
            )}
          >
            {tr("Klik Disini", "Click Here", language)}
          </div>

          {/* Tombol Utama Menu (Pill Button di Bawah - Glassmorphism) */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
              setShowHint(false);
            }}
            aria-expanded={isOpen}
            aria-label={tr("Menu Navigasi", "Navigation Menu", language)}
            className={cn(
              "relative z-50 flex items-center justify-center gap-3 rounded-full border border-white/35 dark:border-white/15 bg-white/25 dark:bg-black/35 px-7 py-3.5 shadow-2xl backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 active:scale-95",
              isOpen
                ? "bg-accent text-accent-foreground border-accent ring-4 ring-accent/30 shadow-accent/30"
                : "text-foreground hover:border-accent/60 hover:bg-white/35 dark:hover:bg-black/45",
            )}
          >
            <ActiveIcon
              className={cn(
                "h-5 w-5 transition-colors duration-200",
                isOpen ? "text-accent-foreground" : "text-accent",
              )}
            />
            <span className="text-sm font-bold tracking-wide">{activeLabel}</span>
            <ChevronUp
              className={cn(
                "h-5 w-5 transition-transform duration-300",
                isOpen ? "rotate-180 text-accent-foreground" : "text-muted-foreground",
              )}
            />
          </button>
        </div>
      </div>
    </>
  );
}
