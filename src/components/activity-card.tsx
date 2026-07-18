import { Maximize2 } from "lucide-react";
import type { ActivityItem } from "@/data/activities";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

const ratioClass: Record<ActivityItem["ratio"], string> = {
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  "9/16": "aspect-[9/16]",
  "1/1": "aspect-square",
  "2/3": "aspect-[2/3]",
  "3/2": "aspect-[3/2]",
};

interface Props {
  item: ActivityItem;
  onClick: () => void;
}

export function ActivityCard({ item, onClick }: Props) {
  const { language } = useLanguage();
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative mb-3 block w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm",
        "break-inside-avoid transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-accent hover:shadow-lg",
      )}
    >
      <div className={cn("w-full overflow-hidden", ratioClass[item.ratio])}>
        <img
          src={item.image}
          alt={tr(item.alt.id, item.alt.en, language)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Hover overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex flex-col justify-end p-3",
          "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        )}
      >
        <div className="flex flex-wrap gap-1.5">
          {item.keywords.slice(0, 3).map((k) => (
            <span
              key={k}
              className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-foreground shadow-sm backdrop-blur"
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* Zoom icon */}
      <div
        className={cn(
          "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full",
          "bg-white/90 text-foreground shadow-sm backdrop-blur",
          "opacity-0 transition-all duration-300 group-hover:opacity-100",
        )}
      >
        <Maximize2 className="h-4 w-4" />
      </div>
    </button>
  );
}
