import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { type Project, type ProjectType } from "@/data/projects";
import { getProjectsFn } from "@/lib/admin-server";
import { ProjectStats } from "@/components/project-stats";
import { CategoryFilter, type FilterValue } from "@/components/category-filter";
import { ProjectCard } from "@/components/project-card";
import { ProjectDetailDialog } from "@/components/project-detail-dialog";
import { SearchBar } from "@/components/search-bar";
import {
  FilterSidebar,
  FilterTrigger,
  FilterSection,
  FilterChipGroup,
  SortRadioGroup,
} from "@/components/filter-sidebar";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Proyek — Muhammad Luthfi Abdillah" },
      {
        name: "description",
        content:
          "Portofolio 20 proyek lintas Web, Mobile, UI/UX, dan Animasi karya Muhammad Luthfi Abdillah.",
      },
      { property: "og:title", content: "Proyek — Muhammad Luthfi Abdillah" },
      {
        property: "og:description",
        content: "20 proyek: Web, Mobile, UI/UX, Animasi.",
      },
    ],
  }),
  loader: () => getProjectsFn(),
  component: ProjectsPage,
});

type SortOption = "newest" | "oldest" | "az";

const TYPE_OPTIONS: { value: ProjectType; id: string; en: string }[] = [
  { value: "internship", id: "Magang", en: "Internship" },
  { value: "freelance", id: "Freelance", en: "Freelance" },
  { value: "personal", id: "Personal", en: "Personal" },
  { value: "competition", id: "Kompetisi", en: "Competition" },
  { value: "academic", id: "Akademik", en: "Academic" },
];

// Extract year utility function
function parseYear(period: string): number {
  const match = period.match(/\d{4}/g);
  if (!match) return 0;
  return parseInt(match[match.length - 1], 10);
}

function matchesSearch(p: Project, q: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    p.title.toLowerCase().includes(lower) ||
    p.shortDesc.id.toLowerCase().includes(lower) ||
    p.shortDesc.en.toLowerCase().includes(lower) ||
    p.partner.toLowerCase().includes(lower) ||
    p.techStack.some((t) => t.toLowerCase().includes(lower)) ||
    p.subcategories.some((s) => s.toLowerCase().includes(lower))
  );
}

function ProjectsPage() {
  const projects = Route.useLoaderData();
  const { language } = useLanguage();
  const [filter, setFilter] = useState<FilterValue>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("newest");
  const [typeFilter, setTypeFilter] = useState<ProjectType[]>([]);
  const [techFilter, setTechFilter] = useState<string[]>([]);

  const ALL_TECH = useMemo(() => {
    return [...new Set(projects.flatMap((p) => p.techStack))].sort();
  }, [projects]);

  const activeFilterCount = typeFilter.length + techFilter.length + (sort !== "newest" ? 1 : 0);

  const counts = useMemo<Record<FilterValue, number>>(
    () => ({
      all: projects.length,
      web: projects.filter((p) => p.category === "web").length,
      mobile: projects.filter((p) => p.category === "mobile").length,
      uiux: projects.filter((p) => p.category === "uiux").length,
      app: projects.filter((p) => p.category === "app").length,
    }),
    [],
  );

  const filtered = useMemo(() => {
    let list = filter === "all" ? [...projects] : projects.filter((p) => p.category === filter);
    // search
    if (search.trim()) list = list.filter((p) => matchesSearch(p, search.trim()));
    // type filter
    if (typeFilter.length > 0) list = list.filter((p) => typeFilter.includes(p.type));
    // tech filter
    if (techFilter.length > 0)
      list = list.filter((p) => techFilter.some((t) => p.techStack.includes(t)));
    // sort
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "oldest") list.sort((a, b) => parseYear(a.period) - parseYear(b.period));
    else list.sort((a, b) => parseYear(b.period) - parseYear(a.period));
    return list;
  }, [filter, search, typeFilter, techFilter, sort]);

  function resetFilters() {
    setSort("newest");
    setTypeFilter([]);
    setTechFilter([]);
  }

  function toggleType(v: ProjectType) {
    setTypeFilter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }

  function toggleTech(v: string) {
    setTechFilter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Hero */}
      <header className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {tr("Portofolio", "Portfolio", language)}
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {tr("Proyek", "Projects", language)}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          {tr(
            "Kumpulan karya lintas Web, Mobile, UI/UX, dan Animasi — dari magang, freelance, kompetisi, hingga proyek personal.",
            "A collection of work across Web, Mobile, UI/UX, and Animation — from internships, freelance, competitions, and personal projects.",
            language,
          )}
        </p>
      </header>

      {/* Stat cards */}
      <ProjectStats projects={projects} />

      {/* Category tabs */}
      <div className="mt-8 mb-3">
        <CategoryFilter value={filter} onChange={setFilter} counts={counts} />
      </div>

      {/* Search + Filter toolbar */}
      <div className="mb-6 flex items-center gap-2">
        <SearchBar
          value={search}
          onChange={setSearch}
          language={language}
          placeholder={{ id: "Cari proyek, tech stack, partner...", en: "Search project, tech stack, partner..." }}
        />
        <FilterTrigger
          onClick={() => setSidebarOpen(true)}
          activeCount={activeFilterCount}
          language={language}
        />
      </div>

      {/* Result count */}
      {(search || activeFilterCount > 0) && (
        <p className="mb-4 text-sm text-muted-foreground">
          {tr(`${filtered.length} proyek ditemukan`, `${filtered.length} projects found`, language)}
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
          {tr("Tidak ada proyek yang cocok.", "No matching projects found.", language)}
        </div>
      )}

      <ProjectDetailDialog project={selected} onClose={() => setSelected(null)} />

      {/* Filter Sidebar */}
      <FilterSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        language={language}
        onReset={resetFilters}
        activeCount={activeFilterCount}
      >
        <FilterSection label={tr("Urutkan", "Sort by", language)}>
          <SortRadioGroup
            selected={sort}
            onSelect={(v) => setSort(v as SortOption)}
            options={[
              { value: "newest", label: tr("Terbaru", "Newest first", language) },
              { value: "oldest", label: tr("Terlama", "Oldest first", language) },
              { value: "az", label: tr("A – Z", "A – Z", language) },
            ]}
          />
        </FilterSection>

        <FilterSection label={tr("Tipe Proyek", "Project Type", language)}>
          <FilterChipGroup
            options={TYPE_OPTIONS.map((o) => ({
              value: o.value,
              label: tr(o.id, o.en, language),
            }))}
            selected={typeFilter}
            onToggle={(v) => toggleType(v as ProjectType)}
          />
        </FilterSection>

        <FilterSection label={tr("Tech Stack", "Tech Stack", language)}>
          <FilterChipGroup
            options={ALL_TECH.map((t) => ({ value: t, label: t }))}
            selected={techFilter}
            onToggle={toggleTech}
          />
        </FilterSection>
      </FilterSidebar>
    </div>
  );
}
