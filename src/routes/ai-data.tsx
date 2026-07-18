import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { type AiItem, type AiCategory, type AiStatus, statusMeta, aiItems } from "@/data/ai-data";
import { AiStats } from "@/components/ai-stats";
import { AiListItem } from "@/components/ai-list-item";
import { AiDetailDialog } from "@/components/ai-detail-dialog";
import { SearchBar } from "@/components/search-bar";
import {
  FilterSidebar,
  FilterTrigger,
  FilterSection,
  FilterChipGroup,
  SortRadioGroup,
} from "@/components/filter-sidebar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai-data")({
  head: () => ({
    meta: [
      { title: "AI & Data — Muhammad Luthfi Abdillah" },
      {
        name: "description",
        content:
          "Model machine learning, dataset publik hasil scraping, dan tools eksperimen karya Muhammad Luthfi Abdillah.",
      },
      { property: "og:title", content: "AI & Data — Muhammad Luthfi Abdillah" },
      {
        property: "og:description",
        content: "Model ML/DL, dataset publik, dan tools scraping.",
      },
    ],
  }),
  loader: () => aiItems,
  component: AiDataPage,
});

type SortOption = "az" | "za";

const tabOptions: { value: AiCategory; id: string; en: string }[] = [
  { value: "model", id: "Model", en: "Model" },
  { value: "dataset", id: "Dataset", en: "Dataset" },
  { value: "tool", id: "Tools", en: "Tools" },
];

const STATUS_OPTIONS: AiStatus[] = ["online", "maintenance", "archived", "offline"];

function matchesSearch(i: AiItem, q: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    i.title.toLowerCase().includes(lower) ||
    i.description.id.toLowerCase().includes(lower) ||
    i.description.en.toLowerCase().includes(lower) ||
    i.keywords.some((k) => k.toLowerCase().includes(lower)) ||
    (i.domain?.toLowerCase().includes(lower) ?? false)
  );
}

function AiDataPage() {
  const aiItems = Route.useLoaderData();
  const { language } = useLanguage();
  const [tab, setTab] = useState<AiCategory>("model");
  const [selected, setSelected] = useState<AiItem | null>(null);

  // Search & filter
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("az");
  const [statusFilter, setStatusFilter] = useState<AiStatus[]>([]);
  const [domainFilter, setDomainFilter] = useState<string[]>([]);

  const activeFilterCount =
    statusFilter.length + domainFilter.length + (sort !== "az" ? 1 : 0);

  const ALL_DOMAINS = useMemo(() => {
    return [...new Set(aiItems.map((i) => i.domain).filter(Boolean) as string[])].sort();
  }, [aiItems]);

  const byCat = useMemo(
    () => ({
      model: aiItems.filter((i) => i.category === "model"),
      dataset: aiItems.filter((i) => i.category === "dataset"),
      tool: aiItems.filter((i) => i.category === "tool"),
    }),
    [aiItems],
  );

  const current = useMemo(() => {
    let list = [...byCat[tab]];
    if (search.trim()) list = list.filter((i) => matchesSearch(i, search.trim()));
    if (statusFilter.length > 0) list = list.filter((i) => statusFilter.includes(i.status));
    if (domainFilter.length > 0)
      list = list.filter((i) => i.domain && domainFilter.some((d) => i.domain?.includes(d)));
    if (sort === "za") list.sort((a, b) => b.title.localeCompare(a.title));
    else list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [tab, search, statusFilter, domainFilter, sort, byCat]);

  function resetFilters() {
    setSort("az");
    setStatusFilter([]);
    setDomainFilter([]);
  }

  function toggleStatus(v: AiStatus) {
    setStatusFilter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }

  function toggleDomain(v: string) {
    setDomainFilter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Hero */}
      <header className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {tr("Eksperimen", "Experiments", language)}
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {tr("AI & Data", "AI & Data", language)}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          {tr(
            "Kumpulan model machine learning, dataset publik hasil scraping, dan tools eksperimen — dari NLP, deep learning, hingga sistem rekomendasi.",
            "A collection of machine learning models, public scraped datasets, and experimental tools — from NLP, deep learning, to recommendation systems.",
            language,
          )}
        </p>
      </header>

      {/* Stat cards */}
      <AiStats items={aiItems} />

      {/* Pill tabs */}
      <div className="mt-8 mb-3">
        <div className="sticky top-3 z-20 flex flex-wrap gap-2 rounded-full border border-border/60 bg-card/80 p-1.5 backdrop-blur-md shadow-sm w-fit mx-auto">
          {tabOptions.map((opt) => {
            const active = tab === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTab(opt.value)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
              >
                <span>{tr(opt.id, opt.en, language)}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 text-xs font-semibold",
                    active ? "bg-accent-foreground/20" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {byCat[opt.value].length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search + Filter toolbar */}
      <div className="mb-6 flex items-center gap-2">
        <SearchBar
          value={search}
          onChange={setSearch}
          language={language}
          placeholder={{ id: "Cari model, dataset, keyword...", en: "Search model, dataset, keyword..." }}
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
          {tr(`${current.length} item ditemukan`, `${current.length} items found`, language)}
        </p>
      )}

      {/* List */}
      {current.length > 0 ? (
        <div className="flex flex-col gap-3">
          {current.map((i) => (
            <AiListItem key={i.id} item={i} onClick={() => setSelected(i)} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
          {tr("Tidak ada item yang cocok.", "No matching items found.", language)}
        </div>
      )}

      <AiDetailDialog item={selected} onClose={() => setSelected(null)} />

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
              { value: "az", label: "A – Z" },
              { value: "za", label: "Z – A" },
            ]}
          />
        </FilterSection>

        <FilterSection label={tr("Status", "Status", language)}>
          <FilterChipGroup
            options={STATUS_OPTIONS.map((s) => ({
              value: s,
              label: tr(statusMeta[s].id, statusMeta[s].en, language),
            }))}
            selected={statusFilter}
            onToggle={(v) => toggleStatus(v as AiStatus)}
          />
        </FilterSection>

        {ALL_DOMAINS.length > 0 && (
          <FilterSection label={tr("Domain", "Domain", language)}>
            <FilterChipGroup
              options={ALL_DOMAINS.map((d) => ({ value: d, label: d }))}
              selected={domainFilter}
              onToggle={toggleDomain}
            />
          </FilterSection>
        )}
      </FilterSidebar>
    </div>
  );
}
