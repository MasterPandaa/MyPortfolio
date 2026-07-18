import { Camera, Tag, LayoutGrid } from "lucide-react";
import { activityItems as staticActivities, type ActivityItem } from "@/data/activities";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

const gradients = [
  "from-navy to-navy-deep",
  "from-accent to-accent/60",
  "from-emerald-500 to-teal-600",
];

export function ActivityStats({ items: data = staticActivities }: { items?: ActivityItem[] }) {
  const { language } = useLanguage();

  const totalPhotos = data.length;
  const uniqueKeywords = new Set(data.flatMap((i) => i.keywords)).size;
  const uniqueRatios = new Set(data.map((i) => i.ratio)).size;

  const items = [
    {
      icon: Camera,
      id: "Total Foto",
      en: "Total Photos",
      value: totalPhotos,
      unitId: "foto",
      unitEn: "photos",
    },
    {
      icon: Tag,
      id: "Keyword Unik",
      en: "Unique Keywords",
      value: uniqueKeywords,
      unitId: "keyword",
      unitEn: "keywords",
    },
    {
      icon: LayoutGrid,
      id: "Variasi Rasio",
      en: "Ratio Variety",
      value: uniqueRatios,
      unitId: "rasio",
      unitEn: "ratios",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4">
      {items.map((it, idx) => {
        const Icon = it.icon;
        return (
          <div
            key={it.en}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border/60",
              "bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
            )}
          >
            <div
              className={cn(
                "absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl bg-gradient-to-br",
                gradients[idx],
              )}
            />
            <div className="relative flex items-start justify-between">
              <div className="min-w-0">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground truncate">
                  {tr(it.id, it.en, language)}
                </div>
                <div className="mt-2 font-display text-4xl font-bold leading-none text-foreground">
                  {it.value}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {tr(it.unitId, it.unitEn, language)}
                </div>
              </div>
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                  gradients[idx],
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
