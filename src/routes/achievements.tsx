import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useLanguage, t as tr } from "@/contexts/language-context";
import {
  type AchievementItem,
  type AchievementCategory,
  achievementItems,
} from "@/data/achievements";
import { AchievementStats } from "@/components/achievement-stats";
import { AchievementListItem } from "@/components/achievement-list-item";
import { AchievementDetailDialog } from "@/components/achievement-detail-dialog";
import { SearchBar } from "@/components/search-bar";
import {
  FilterSidebar,
  FilterTrigger,
  FilterSection,
  FilterChipGroup,
  SortRadioGroup,
} from "@/components/filter-sidebar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Pencapaian — Muhammad Luthfi Abdillah" },
      {
        name: "description",
        content:
          "Sertifikasi profesi, penghargaan kompetitif, dan publikasi ilmiah karya Muhammad Luthfi Abdillah.",
      },
      { property: "og:title", content: "Pencapaian — Muhammad Luthfi Abdillah" },
      {
        property: "og:description",
        content: "Sertifikasi, penghargaan, dan publikasi ilmiah.",
      },
    ],
  }),
  loader: () => achievementItems,
  component: AchievementsPage,
});

type TabValue = "all" | AchievementCategory;
type SortOption = "newest" | "oldest" | "az";

const tabOptions: { value: TabValue; id: string; en: string }[] = [
  { value: "all", id: "Semua", en: "All" },
  { value: "certification", id: "Sertifikasi", en: "Certifications" },
  { value: "award", id: "Penghargaan", en: "Awards" },
  { value: "publication", id: "Publikasi", en: "Publications" },
];

function matchesSearch(i: AchievementItem, q: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    i.title.toLowerCase().includes(lower) ||
    i.subtitle.id.toLowerCase().includes(lower) ||
    i.subtitle.en.toLowerCase().includes(lower) ||
    i.keywords.some((k) => k.toLowerCase().includes(lower)) ||
    (i.issuer?.toLowerCase().includes(lower) ?? false) ||
    (i.journal?.toLowerCase().includes(lower) ?? false)
  );
}

function AchievementsPage() {
  const achievementItems = Route.useLoaderData();
  const { language } = useLanguage();
  const [tab, setTab] = useState<TabValue>("all");
  const [selected, setSelected] = useState<AchievementItem | null>(null);

  // Search & filter
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("newest");
  const [yearFilter, setYearFilter] = useState<number[]>([]);
  const [issuerFilter, setIssuerFilter] = useState<string[]>([]);

  const activeFilterCount =
    yearFilter.length + issuerFilter.length + (sort !== "newest" ? 1 : 0);

  const ALL_YEARS = useMemo(() => {
    return [...new Set(achievementItems.map((i) => i.year))].sort((a, b) => b - a);
  }, [achievementItems]);

  const ALL_ISSUERS = useMemo(() => {
    return [...new Set(achievementItems.map((i) => i.issuer).filter(Boolean) as string[])].sort();
  }, [achievementItems]);

  const counts = useMemo<Record<TabValue, number>>(
    () => ({
      all: achievementItems.length,
      certification: achievementItems.filter((i) => i.category === "certification").length,
      award: achievementItems.filter((i) => i.category === "award").length,
      publication: achievementItems.filter((i) => i.category === "publication").length,
    }),
    [achievementItems],
  );

  const current = useMemo(() => {
    let list =
      tab === "all"
        ? [...achievementItems]
        : achievementItems.filter((i) => i.category === tab);
    if (search.trim()) list = list.filter((i) => matchesSearch(i, search.trim()));
    if (yearFilter.length > 0) list = list.filter((i) => yearFilter.includes(i.year));
    if (issuerFilter.length > 0)
      list = list.filter((i) => i.issuer && issuerFilter.includes(i.issuer));
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "oldest") list.sort((a, b) => a.year - b.year);
    else list.sort((a, b) => b.year - a.year);
    return list;
  }, [tab, search, yearFilter, issuerFilter, sort]);

  function resetFilters() {
    setSort("newest");
    setYearFilter([]);
    setIssuerFilter([]);
  }

  function toggleYear(v: number) {
    setYearFilter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }

  function toggleIssuer(v: string) {
    setIssuerFilter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Hero */}
      <header className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {tr("Pencapaian", "Achievements", language)}
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {tr(
            "Sertifikasi, Penghargaan, dan Publikasi",
            "Certifications, Awards, and Publications",
            language,
          )}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          {tr(
            "Validasi keahlian teknis, prestasi kompetitif, dan karya ilmiah — dari sertifikasi profesi hingga pengabdian masyarakat.",
            "Technical expertise validation, competitive achievements, and scientific works — from professional certifications to community service.",
            language,
          )}
        </p>
      </header>

      {/* Stat cards */}
      <AchievementStats items={achievementItems} />

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
                  {counts[opt.value]}
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
          placeholder={{ id: "Cari sertifikat, penghargaan, publikasi...", en: "Search certificate, award, publication..." }}
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
            <AchievementListItem key={i.id} item={i} onClick={() => setSelected(i)} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
          {tr("Tidak ada item yang cocok.", "No matching items found.", language)}
        </div>
      )}

      <AchievementDetailDialog item={selected} onClose={() => setSelected(null)} />

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
              { value: "az", label: "A – Z" },
            ]}
          />
        </FilterSection>

        <FilterSection label={tr("Tahun", "Year", language)}>
          <FilterChipGroup
            options={ALL_YEARS.map((y) => ({ value: String(y), label: String(y) }))}
            selected={yearFilter.map(String)}
            onToggle={(v) => toggleYear(Number(v))}
          />
        </FilterSection>

        {ALL_ISSUERS.length > 0 && (
          <FilterSection label={tr("Penerbit / Penyelenggara", "Issuer / Organizer", language)}>
            <FilterChipGroup
              options={ALL_ISSUERS.map((s) => ({ value: s, label: s }))}
              selected={issuerFilter}
              onToggle={toggleIssuer}
            />
          </FilterSection>
        )}
      </FilterSidebar>
    </div>
  );
}
