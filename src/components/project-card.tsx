import { Code2, Smartphone, Palette, AppWindow, Calendar } from "lucide-react";
import { categoryMeta, typeLabel, type Project, type ProjectCategory } from "@/data/projects";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

const iconMap: Record<ProjectCategory, typeof Code2> = {
  web: Code2,
  mobile: Smartphone,
  uiux: Palette,
  app: AppWindow,
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { language } = useLanguage();
  const meta = categoryMeta[project.category];
  const Icon = iconMap[project.category];
  const visibleTech = project.techStack.slice(0, 4);
  const restCount = project.techStack.length - visibleTech.length;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left",
        "shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent/60",
      )}
    >
      {/* Visual header */}
      <div className={cn("relative aspect-[16/10] w-full bg-gradient-to-br", meta.gradient)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <span className="font-display text-6xl font-bold text-white/25 leading-none">
            {String(project.id).padStart(2, "0")}
          </span>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="absolute bottom-3 left-4">
          <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {tr(meta.id, meta.en, language)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {project.subcategories.slice(0, 2).map((sub) => (
            <span
              key={sub}
              className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {sub}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold leading-tight text-foreground line-clamp-2">
          {project.title}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
          {tr(project.shortDesc.id, project.shortDesc.en, language)}
        </p>

        {/* Tech chips */}
        <div className="mt-3 flex flex-wrap gap-1">
          {visibleTech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-foreground/80"
            >
              {t}
            </span>
          ))}
          {restCount > 0 && (
            <span className="rounded-md bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
              +{restCount}
            </span>
          )}
        </div>

        {/* Footer meta */}
        <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 text-[11px] text-muted-foreground">
          <span className="font-semibold text-foreground/70">
            {tr(typeLabel[project.type].id, typeLabel[project.type].en, language)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {project.period}
          </span>
        </div>
      </div>
    </button>
  );
}
