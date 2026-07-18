import { Code2, Smartphone, Palette, AppWindow } from "lucide-react";
import { projects as staticProjects, categoryMeta, type Project, type ProjectCategory } from "@/data/projects";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

const items: {
  cat: ProjectCategory;
  icon: typeof Code2;
}[] = [
  { cat: "web", icon: Code2 },
  { cat: "mobile", icon: Smartphone },
  { cat: "uiux", icon: Palette },
  { cat: "app", icon: AppWindow },
];

export function ProjectStats({ projects = staticProjects }: { projects?: Project[] }) {
  const { language } = useLanguage();
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {items.map(({ cat, icon: Icon }) => {
        const count = projects.filter((p) => p.category === cat).length;
        const meta = categoryMeta[cat];
        return (
          <div
            key={cat}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border/60",
              "bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
            )}
          >
            <div
              className={cn(
                "absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl",
                "bg-gradient-to-br",
                meta.gradient,
              )}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {tr(meta.id, meta.en, language)}
                </div>
                <div className="mt-2 font-display text-4xl font-bold leading-none text-foreground">
                  {count}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {tr("proyek", "projects", language)}
                </div>
              </div>
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  "bg-gradient-to-br text-white shadow-sm",
                  meta.gradient,
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
