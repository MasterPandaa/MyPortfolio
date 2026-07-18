import type { ProjectCategory } from "@/data/projects";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

export type FilterValue = "all" | ProjectCategory;

interface CategoryFilterProps {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
  counts: Record<FilterValue, number>;
}

const options: { value: FilterValue; id: string; en: string }[] = [
  { value: "all", id: "Semua", en: "All" },
  { value: "web", id: "Web", en: "Web" },
  { value: "mobile", id: "Mobile", en: "Mobile" },
  { value: "uiux", id: "UI/UX", en: "UI/UX" },
  { value: "app", id: "Aplikasi", en: "App" },
];

export function CategoryFilter({ value, onChange, counts }: CategoryFilterProps) {
  const { language } = useLanguage();
  return (
    <div className="sticky top-3 z-20 flex flex-wrap gap-2 rounded-full border border-border/60 bg-card/80 p-1.5 backdrop-blur-md shadow-sm w-fit mx-auto">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
              active
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary",
            )}
          >
            <span>{tr(opt.id, opt.en, language)}</span>
            <span
              className={cn(
                "rounded-full px-1.5 text-xs font-semibold",
                active ? "bg-accent-foreground/20" : "bg-secondary text-muted-foreground",
              )}
            >
              {counts[opt.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
