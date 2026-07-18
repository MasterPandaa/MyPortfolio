import {
  BrainCircuit,
  Database,
  Wrench,
  ExternalLink,
  Github,
  BookOpen,
  Tag,
  Gauge,
  Activity,
  Boxes,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categoryMeta, statusMeta, type AiItem, type AiCategory } from "@/data/ai-data";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

const iconMap: Record<AiCategory, typeof BrainCircuit> = {
  model: BrainCircuit,
  dataset: Database,
  tool: Wrench,
};

interface Props {
  item: AiItem | null;
  onClose: () => void;
}

export function AiDetailDialog({ item, onClose }: Props) {
  const { language } = useLanguage();
  if (!item) return null;

  const meta = categoryMeta[item.category];
  const stat = statusMeta[item.status];
  const Icon = iconMap[item.category];

  const highlights =
    item.category === "model"
      ? item.metrics
      : item.category === "dataset"
        ? item.volume
          ? [item.volume]
          : undefined
        : item.runtime;
  const highlightTitle =
    item.category === "model"
      ? tr("Metrik & Performa", "Metrics & Performance", language)
      : item.category === "dataset"
        ? tr("Volume & Format", "Volume & Format", language)
        : tr("Runtime & Output", "Runtime & Output", language);

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
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-semibold text-white",
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", stat.dot)} />
                {tr(stat.id, stat.en, language)}
              </span>
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
              label={tr("Tipe", "Type", language)}
              value={tr(meta.id, meta.en, language)}
            />
            {item.domain && (
              <MetaItem icon={Tag} label={tr("Domain", "Domain", language)} value={item.domain} />
            )}
            <MetaItem
              icon={Activity}
              label="Status"
              value={tr(stat.id, stat.en, language)}
            />
            <MetaItem
              icon={Tag}
              label={tr("Keywords", "Keywords", language)}
              value={item.keywords.join(", ")}
            />
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

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="mt-6">
              <h4 className="flex items-center gap-2 font-display text-base font-bold text-foreground mb-2">
                <Gauge className="h-4 w-4 text-accent" />
                {highlightTitle}
              </h4>
              <ul className="space-y-1.5">
                {highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-sm text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
            {item.demoUrl ? (
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="h-4 w-4" />
                {tr("Lihat Demo", "View Demo", language)}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm text-muted-foreground">
                <ExternalLink className="h-4 w-4" />
                {tr("Demo — segera", "Demo — coming soon", language)}
              </span>
            )}
            {item.repoUrl ? (
              <a
                href={item.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                <Github className="h-4 w-4" />
                {tr("Repositori", "Repository", language)}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm text-muted-foreground">
                <Github className="h-4 w-4" />
                {tr("Repo — segera", "Repo — coming soon", language)}
              </span>
            )}
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
