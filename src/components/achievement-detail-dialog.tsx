import {
  BadgeCheck,
  Trophy,
  BookOpen,
  ExternalLink,
  FileText,
  Tag,
  Calendar,
  Boxes,
  Building2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  item: AchievementItem | null;
  onClose: () => void;
}

export function AchievementDetailDialog({ item, onClose }: Props) {
  const { language } = useLanguage();
  if (!item) return null;

  const meta = categoryMeta[item.category];
  const Icon = iconMap[item.category];
  const pubTag =
    item.category === "publication" && item.publicationType
      ? publicationTypeMeta[item.publicationType]
      : null;

  const issuerLabel =
    item.category === "publication"
      ? tr("Jurnal", "Journal", language)
      : item.category === "award"
        ? tr("Penyelenggara", "Organizer", language)
        : tr("Penerbit", "Issuer", language);
  const issuerValue =
    item.category === "publication" ? item.journal : item.issuer;

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Visual header */}
        <div className={cn("relative aspect-[21/9] w-full bg-gradient-to-br", meta.gradient)}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent_60%)]" />
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex items-start justify-between">
              <span className="font-display text-7xl font-bold text-white/25 leading-none">
                {String(item.id).padStart(2, "0")}
              </span>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20">
                <Icon className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                {tr(meta.id, meta.en, language)}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                <Calendar className="h-3.5 w-3.5" />
                {item.year}
              </span>
              {pubTag && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  {tr(pubTag.id, pubTag.en, language)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <DialogHeader className="mb-2">
            <DialogTitle className="font-display text-2xl md:text-3xl font-bold leading-tight">
              {item.title}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm italic text-muted-foreground">
            {tr(item.subtitle.id, item.subtitle.en, language)}
          </p>

          {/* Meta grid */}
          <div className="mt-5 grid grid-cols-1 gap-3 rounded-xl border border-border bg-secondary/50 p-4 sm:grid-cols-2">
            <MetaItem
              icon={Boxes}
              label={tr("Kategori", "Category", language)}
              value={tr(meta.id, meta.en, language)}
            />
            {issuerValue && (
              <MetaItem icon={Building2} label={issuerLabel} value={issuerValue} />
            )}
            <MetaItem
              icon={Calendar}
              label={tr("Tahun", "Year", language)}
              value={String(item.year)}
            />
            {pubTag && (
              <MetaItem
                icon={Tag}
                label={tr("Tipe", "Type", language)}
                value={tr(pubTag.id, pubTag.en, language)}
              />
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h4 className="flex items-center gap-2 font-display text-base font-bold text-foreground mb-2">
              <BookOpen className="h-4 w-4 text-accent" />
              {tr("Deskripsi", "Description", language)}
            </h4>
            <p className="text-sm leading-relaxed text-foreground/85">
              {tr(item.description.id, item.description.en, language)}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Tags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.keywords.map((k) => (
                <span
                  key={k}
                  className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 flex flex-wrap gap-2">
            {item.certificateUrl ? (
              <a
                href={item.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
              >
                <FileText className="h-4 w-4" />
                {tr("Lihat Sertifikat", "View Certificate", language)}
              </a>
            ) : (
              item.category !== "publication" && (
                <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  {tr("Sertifikat — segera", "Certificate — coming soon", language)}
                </span>
              )
            )}
            {item.category === "publication" &&
              (item.doiUrl ? (
                <a
                  href={item.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="h-4 w-4" />
                  {tr("Baca Publikasi", "Read Publication", language)}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm text-muted-foreground">
                  <ExternalLink className="h-4 w-4" />
                  {tr("DOI — segera", "DOI — coming soon", language)}
                </span>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Tag;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card border border-border">
        <Icon className="h-4 w-4 text-accent" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-medium text-foreground break-words">{value}</div>
      </div>
    </div>
  );
}
