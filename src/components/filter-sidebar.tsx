import { useEffect, useRef } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { t as tr } from "@/contexts/language-context";
import type { Language } from "@/contexts/language-context";

// ─── Trigger Button ────────────────────────────────────────────────────────────

interface FilterTriggerProps {
  onClick: () => void;
  activeCount: number;
  language: Language;
}

export function FilterTrigger({ onClick, activeCount, language }: FilterTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium",
        "transition-all duration-200",
        activeCount > 0
          ? "border-accent bg-accent text-accent-foreground shadow-sm"
          : "border-border/70 bg-card/80 text-foreground hover:border-accent/60 hover:bg-secondary backdrop-blur-sm",
      )}
    >
      <SlidersHorizontal className="h-4 w-4" />
      <span>{tr("Filter", "Filter", language)}</span>
      {activeCount > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-foreground/25 text-xs font-bold">
          {activeCount}
        </span>
      )}
    </button>
  );
}

// ─── Sidebar Panel ─────────────────────────────────────────────────────────────

interface FilterSidebarProps {
  open: boolean;
  onClose: () => void;
  language: Language;
  title?: string;
  onReset: () => void;
  activeCount: number;
  children: React.ReactNode;
}

export function FilterSidebar({
  open,
  onClose,
  language,
  title,
  onReset,
  activeCount,
  children,
}: FilterSidebarProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? tr("Filter", "Filter", language)}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-[320px] max-w-[90vw] flex-col",
          "border-l border-border bg-background shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="h-4 w-4 text-accent" />
            <h2 className="text-base font-semibold text-foreground">
              {title ?? tr("Filter & Urutkan", "Filter & Sort", language)}
            </h2>
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-accent-foreground">
                {activeCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filter"
            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {children}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-5 py-4 flex gap-2">
          <button
            type="button"
            onClick={onReset}
            disabled={activeCount === 0}
            className={cn(
              "flex-1 rounded-full border border-border py-2 text-sm font-medium transition-all",
              activeCount > 0
                ? "text-foreground hover:bg-secondary"
                : "text-muted-foreground cursor-not-allowed opacity-50",
            )}
          >
            {tr("Reset", "Reset", language)}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full bg-accent py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
          >
            {tr("Terapkan", "Apply", language)}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Reusable Section & Chip inside sidebar ────────────────────────────────────

export function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}

export function FilterChipGroup({
  options,
  selected,
  onToggle,
}: {
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onToggle(opt.value)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150",
              active
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-foreground hover:border-accent/60 hover:bg-secondary",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function SortRadioGroup({
  options,
  selected,
  onSelect,
}: {
  options: { value: string; label: string }[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {options.map((opt) => {
        const active = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm text-left transition-all duration-150",
              active
                ? "border-accent bg-accent/10 text-foreground font-medium"
                : "border-border bg-card text-muted-foreground hover:border-border/60 hover:bg-secondary hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "h-3.5 w-3.5 shrink-0 rounded-full border-2 flex items-center justify-center",
                active ? "border-accent" : "border-border",
              )}
            >
              {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
            </span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
