import { BadgeCheck, Trophy, BookOpen, Calendar } from "lucide-react";
import {
  categoryMeta,
  publicationTypeMeta,
  type AchievementItem,
  type AchievementCategory,
} from "@/data/achievements";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

const iconMap: Record<AchievementCategory, typeof BadgeCheck> = {
  certification: BadgeCheck,
  award: Trophy,
  publication: BookOpen,
};

interface Props {
  item: AchievementItem;
  onClick: () => void;
}

export function AchievementListItem({ item, onClick }: Props) {
  const { language } = useLanguage();
  const meta = categoryMeta[item.category];
  const Icon = iconMap[item.category];
  const pubTag =
    item.category === "publication" && item.publicationType
      ? publicationTypeMeta[item.publicationType]
      : null;

  const rightMetaLabel =
    item.category === "publication"
      ? tr("Jurnal", "Journal", language)
      : item.category === "award"
        ? tr("Penyelenggara", "Organizer", language)
        : tr("Penerbit", "Issuer", language);
  const rightMetaValue =
    item.category === "publication" ? item.journal : item.issuer;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full flex-col md:flex-row items-start gap-4 rounded-2xl",
        "border border-border/60 bg-card p-4 md:p-5 text-left",
        "shadow-sm transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-accent hover:shadow-md",
      )}
    >
      {/* Left: icon tile */}
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
          meta.gradient,
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      {/* Middle */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
            {item.title}
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {item.year}
          </span>
          {pubTag && (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                pubTag.bg,
                pubTag.text,
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", pubTag.dot)} />
              {tr(pubTag.id, pubTag.en, language)}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs italic text-muted-foreground">
          {tr(item.subtitle.id, item.subtitle.en, language)}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-foreground/80">
          {tr(item.description.id, item.description.en, language)}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.keywords.slice(0, 4).map((k) => (
            <span
              key={k}
              className="rounded-md border border-border bg-secondary/40 px-2 py-0.5 text-[11px] font-medium text-foreground/80"
            >
              {k}
            </span>
          ))}
          {item.keywords.length > 4 && (
            <span className="rounded-md border border-border bg-secondary/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +{item.keywords.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Right: meta */}
      {rightMetaValue && (
        <div className="shrink-0 md:text-right w-full md:w-auto md:max-w-[200px]">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {rightMetaLabel}
          </div>
          <div className="mt-1 text-xs font-medium text-foreground/90">
            {rightMetaValue}
          </div>
        </div>
      )}
    </button>
  );
}
