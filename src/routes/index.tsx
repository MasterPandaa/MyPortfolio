import { createFileRoute } from "@tanstack/react-router";
import { useLanguage, t as tr } from "@/contexts/language-context";
import * as Icons from "lucide-react";
import { homepageData } from "@/data/homepage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Luthfi Abdillah — AI Agent, QA & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio Muhammad Luthfi Abdillah — Kecerdasan Buatan (LLM & AI Agent), Software Quality Assurance, dan Full-Stack Web Development.",
      },
      {
        property: "og:title",
        content: "Muhammad Luthfi Abdillah — AI Agent, QA & Full-Stack Developer",
      },
      {
        property: "og:description",
        content:
          "Portfolio Muhammad Luthfi Abdillah — AI Agent (LLM & n8n), Quality Assurance, dan Full-Stack Developer.",
      },
    ],
  }),
  loader: () => homepageData,
  component: Index,
});

const iconMap: Record<string, any> = {
  Code2: Icons.Code2,
  Database: Icons.Database,
  Brain: Icons.Brain,
  Layout: Icons.Layout,
  Server: Icons.Server,
  Wrench: Icons.Wrench,
  Sparkles: Icons.Sparkles,
  Bot: Icons.Bot,
  ShieldCheck: Icons.ShieldCheck,
  Palette: Icons.Palette,
};

function Index() {
  const data = Route.useLoaderData();
  const { language } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl py-4 md:py-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 px-5 py-5 backdrop-blur-sm md:rounded-3xl md:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-navy/10 blur-3xl" />

        <div className="relative">
          {/* Status badge */}
          <div className="inline-flex items-center rounded-full border border-border bg-background/70 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground md:px-3 md:py-1 md:text-xs">
            {tr(data.available.id, data.available.en, language)}
          </div>

          {/* Name */}
          <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground md:mt-4 md:text-6xl">
            {data.name}
          </h1>

          {/* Subtitle — compact on mobile */}
          <p className="mt-1.5 text-sm font-medium text-accent md:mt-3 md:text-xl">
            {tr(data.subtitle.id, data.subtitle.en, language)}
          </p>

          {/* Description */}
          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground md:mt-5 md:text-base">
            {tr(data.description.id, data.description.en, language)}
          </p>

          {/* IPK & Fokus badges */}
          <div className="mt-4 flex flex-wrap gap-2 md:mt-6 md:gap-3">
            <div className="rounded-xl border border-border bg-background/70 px-3 py-1.5 md:rounded-2xl md:px-4 md:py-2">
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground md:text-[10px]">
                {tr("IPK", "GPA", language)}
              </p>
              <p className="text-sm font-bold text-foreground md:text-lg">{data.gpa}</p>
            </div>
            <div className="rounded-xl border border-border bg-background/70 px-3 py-1.5 md:rounded-2xl md:px-4 md:py-2">
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground md:text-[10px]">
                {tr("Fokus", "Focus", language)}
              </p>
              <p className="text-xs font-semibold text-foreground md:text-sm">
                {data.focus}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-8 md:mt-16">
        <div className="flex items-end justify-between gap-4 px-1">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-accent md:text-xs">
              {tr("Keahlian", "Skills", language)}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-foreground md:text-4xl">
              {tr("Tools & Stack", "Tools & Stack", language)}
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
            {tr(
              "Peralatan yang saya gunakan sehari-hari lintas Data, AI, dan Pengembangan Aplikasi.",
              "Tools I use daily across Data, AI, and Application Development.",
              language,
            )}
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:mt-8 md:gap-4 lg:grid-cols-3">
          {data.skillGroups.map((group) => {
            const Icon = (Icons as any)[group.iconName] || iconMap[group.iconName] || Icons.Wrench;
            return (
              <div
                key={group.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg md:rounded-2xl md:p-6"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent md:h-11 md:w-11 md:rounded-xl">
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground md:mt-4 md:text-base">
                  {tr(group.id, group.en, language)}
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-1 md:mt-4 md:gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-[11px] font-medium text-foreground/80 md:px-2.5 md:py-1 md:text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
