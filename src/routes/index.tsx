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
    <div className="mx-auto max-w-6xl py-10 md:py-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm md:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-navy/10 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Icons.Sparkles className="h-3.5 w-3.5 text-accent" />
            {tr(data.available.id, data.available.en, language)}
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-6xl">
            {data.name}
          </h1>
          <p className="mt-3 text-lg font-medium text-accent md:text-xl">
            {tr(data.subtitle.id, data.subtitle.en, language)}
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {tr(data.description.id, data.description.en, language)}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-2xl border border-border bg-background/70 px-4 py-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {tr("IPK", "GPA", language)}
              </p>
              <p className="text-lg font-bold text-foreground">{data.gpa}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 px-4 py-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {tr("Fokus", "Focus", language)}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {data.focus}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-12 md:mt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              {tr("Keahlian", "Skills", language)}
            </p>
            <h2 className="mt-1 text-3xl font-bold text-foreground md:text-4xl">
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.skillGroups.map((group) => {
            const Icon = (Icons as any)[group.iconName] || iconMap[group.iconName] || Icons.Wrench;
            return (
              <div
                key={group.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {tr(group.id, group.en, language)}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground/80"
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
