import { createFileRoute } from "@tanstack/react-router";
import { useLanguage, t as tr, type Language } from "@/contexts/language-context";
import { Briefcase, MapPin, Calendar, Building2, Sparkle, GraduationCap, Target } from "lucide-react";
import { getExperiencesFn } from "@/lib/admin-server";
import { type Experience, type Bilingual } from "@/data/experiences";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Karir & Magang — Muhammad Luthfi Abdillah" },
      {
        name: "description",
        content:
          "Timeline pengalaman kerja, magang, dan freelance Muhammad Luthfi Abdillah — Full-Stack Developer di sektor kesehatan dan pendidikan.",
      },
      { property: "og:title", content: "Karir & Magang — Muhammad Luthfi Abdillah" },
      {
        property: "og:description",
        content:
          "Pengalaman kerja, magang, dan freelance sebagai Full-Stack Developer & Data Engineer.",
      },
    ],
  }),
  loader: () => getExperiencesFn(),
  component: CareerPage,
});

function pick(b: Bilingual, lang: Language) {
  return tr(b.id, b.en, lang);
}

function CareerPage() {
  const { language } = useLanguage();
  const experiences = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-5xl py-10 md:py-16">
      <header className="mb-10 md:mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {tr("Karir Kerja & Magang", "Career & Internship", language)}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
          {tr("Perjalanan Profesional", "Professional Journey", language)}
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          {tr(
            "Ringkasan pengalaman kerja, magang, dan freelance lintas sektor kesehatan dan pendidikan.",
            "A summary of work, internship, and freelance experiences across healthcare and education sectors.",
            language,
          )}
        </p>
      </header>

      <ol className="relative space-y-8 border-l border-border/70 pl-6 md:pl-10">
        {experiences.map((exp, idx) => (
          <li key={idx} className="relative">
            <span className="absolute -left-[33px] top-6 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-background md:-left-[49px]">
              <Briefcase className="h-3 w-3 text-accent" />
            </span>

            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-foreground md:text-xl">
                    {pick(exp.role, language)}
                  </h2>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-accent">
                    <Building2 className="h-4 w-4" />
                    {exp.company}
                  </p>
                </div>
                <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {pick(exp.status, language)}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {pick(exp.period, language)} · {pick(exp.duration, language)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {exp.location} · {pick(exp.workType, language)}
                </span>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <Section
                  icon={Target}
                  title={tr("Tugas", "Tasks", language)}
                  items={exp.tasks.map((b) => pick(b, language))}
                />
                <Section
                  icon={GraduationCap}
                  title={tr("Yang Dipelajari", "Learnings", language)}
                  items={exp.learnings.map((b) => pick(b, language))}
                />
                <Section
                  icon={Sparkle}
                  title={tr("Dampak", "Impact", language)}
                  items={exp.impact.map((b) => pick(b, language))}
                />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Target;
  title: string;
  items: string[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-foreground">
          {title}
        </h3>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
