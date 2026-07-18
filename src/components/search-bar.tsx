import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { t as tr } from "@/contexts/language-context";
import type { Language } from "@/contexts/language-context";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  language: Language;
  placeholder?: { id: string; en: string };
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  language,
  placeholder = { id: "Cari nama, tag, tech stack...", en: "Search name, tag, tech stack..." },
  className,
}: SearchBarProps) {
  return (
    <div className={cn("relative flex-1 min-w-0", className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={tr(placeholder.id, placeholder.en, language)}
        className={cn(
          "h-10 w-full rounded-full border border-border/70 bg-card/80 pl-10 pr-10 text-sm text-foreground",
          "placeholder:text-muted-foreground backdrop-blur-sm",
          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/60",
          "transition-all duration-200",
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
