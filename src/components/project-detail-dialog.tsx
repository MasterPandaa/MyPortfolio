import {
  Code2,
  Smartphone,
  Palette,
  AppWindow,
  Calendar,
  Building2,
  UserCircle2,
  Activity,
  ExternalLink,
  Github,
  Lightbulb,
  Target,
  BookOpen,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categoryMeta, typeLabel, type Project, type ProjectCategory } from "@/data/projects";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

const iconMap: Record<ProjectCategory, typeof Code2> = {
  web: Code2,
  mobile: Smartphone,
  uiux: Palette,
  app: AppWindow,
};

interface ProjectDetailDialogProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailDialog({ project, onClose }: ProjectDetailDialogProps) {
  const { language } = useLanguage();

  if (!project) return null;
  const meta = categoryMeta[project.category];
  const Icon = iconMap[project.category];

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Visual header */}
        <div className={cn("relative aspect-[21/9] w-full bg-gradient-to-br", meta.gradient)}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent_60%)]" />
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex items-start justify-between">
              <span className="font-display text-7xl font-bold text-white/25 leading-none">
                {String(project.id).padStart(2, "0")}
              </span>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20">
                <Icon className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                {tr(meta.id, meta.en, language)}
              </span>
              {project.subcategories.map((sub) => (
                <span
                  key={sub}
                  className="rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-2.5 py-0.5 text-[11px] text-white/90"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-display text-2xl md:text-3xl font-bold leading-tight">
              {project.title}
            </DialogTitle>
          </DialogHeader>

          <p className="text-base text-muted-foreground">
            {tr(project.shortDesc.id, project.shortDesc.en, language)}
          </p>

          {/* Meta grid */}
          <div className="mt-5 grid grid-cols-1 gap-3 rounded-xl border border-border bg-secondary/50 p-4 sm:grid-cols-2">
            <MetaItem
              icon={UserCircle2}
              label={tr("Peran", "Role", language)}
              value={tr(project.role.id, project.role.en, language)}
            />
            <MetaItem
              icon={Building2}
              label={tr("Mitra", "Partner", language)}
              value={project.partner}
            />
            <MetaItem
              icon={Calendar}
              label={tr("Periode", "Period", language)}
              value={project.period}
            />
            <MetaItem
              icon={Activity}
              label={tr("Tipe", "Type", language)}
              value={tr(typeLabel[project.type].id, typeLabel[project.type].en, language)}
            />
            <MetaItem
              icon={Activity}
              label="Status"
              value={tr(project.status.id, project.status.en, language)}
            />
          </div>

          {/* Sections */}
          <Section
            icon={BookOpen}
            title={tr("Ringkasan", "Overview", language)}
            body={tr(project.overview.id, project.overview.en, language)}
          />
          <Section
            icon={Target}
            title={tr("Tantangan & Solusi", "Challenges & Solutions", language)}
            body={tr(project.challenges.id, project.challenges.en, language)}
          />
          <Section
            icon={Lightbulb}
            title={tr("Pelajaran", "Lessons Learned", language)}
            body={tr(project.lessons.id, project.lessons.en, language)}
          />

          {/* Tech Stack */}
          <div className="mt-6">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              {tr("Fitur Utama", "Key Features", language)}
            </h4>
            <ul className="space-y-1.5">
              {(language === "id" ? project.features.id : project.features.en).map((f, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground/90">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
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
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
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
  icon: typeof Calendar;
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

function Section({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof BookOpen;
  title: string;
  body: string;
}) {
  return (
    <div className="mt-6">
      <h4 className="flex items-center gap-2 font-display text-base font-bold text-foreground mb-2">
        <Icon className="h-4 w-4 text-accent" />
        {title}
      </h4>
      <p className="text-sm leading-relaxed text-foreground/85">{body}</p>
    </div>
  );
}
