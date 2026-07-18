import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { type ActivityItem, activityItems } from "@/data/activities";
import { ActivityCard } from "@/components/activity-card";
import { ActivityLightbox } from "@/components/activity-lightbox";
import { SearchBar } from "@/components/search-bar";
import {
  FilterSidebar,
  FilterTrigger,
  FilterSection,
  FilterChipGroup,
  SortRadioGroup,
} from "@/components/filter-sidebar";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Aktivitas — Muhammad Luthfi Abdillah" },
      {
        name: "description",
        content:
          "Galeri momen akademik, pengabdian masyarakat, magang, dan kompetisi.",
      },
      { property: "og:title", content: "Aktivitas — Muhammad Luthfi Abdillah" },
      {
        property: "og:description",
        content: "Galeri foto kegiatan dan momen.",
      },
    ],
  }),
  loader: () => activityItems,
  component: ActivitiesPage,
});

type SortOption = "default" | "az";

function getPopularKeywordsLocal(items: ActivityItem[], limit = 6): string[] {
  const freq = new Map<string, number>();
  for (const item of items) {
    for (const k of item.keywords) freq.set(k, (freq.get(k) ?? 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map((e) => e[0]);
}

function matchesSearch(i: ActivityItem, q: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    i.keywords.some((k) => k.toLowerCase().includes(lower)) ||
    i.alt.id.toLowerCase().includes(lower) ||
    i.alt.en.toLowerCase().includes(lower)
  );
}

function ActivitiesPage() {
  const activityItems = Route.useLoaderData();
  const { language } = useLanguage();
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("default");
  const [keywordFilter, setKeywordFilter] = useState<string[]>([]);

  const popular = useMemo(() => getPopularKeywordsLocal(activityItems, 12), [activityItems]);
  const activeFilterCount = keywordFilter.length + (sort !== "default" ? 1 : 0);

  const [selected, setSelected] = useState<ActivityItem | null>(null);

  const current = useMemo(() => {
    let list = [...activityItems];
    // search
    if (search.trim()) list = list.filter((i) => matchesSearch(i, search.trim()));
    // keyword multi-filter from sidebar
    if (keywordFilter.length > 0)
      list = list.filter((i) => keywordFilter.some((k) => i.keywords.includes(k)));
    // sort
    if (sort === "az") list.sort((a, b) => a.alt.id.localeCompare(b.alt.id));
    return list;
  }, [activityItems, search, keywordFilter, sort]);

  function resetFilters() {
    setSort("default");
    setKeywordFilter([]);
  }

  function toggleKeyword(v: string) {
    setKeywordFilter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {/* Hero */}
      <header className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {tr("Aktivitas", "Activities", language)}
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {tr("Momen & Kegiatan", "Moments & Activities", language)}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          {tr(
            "Kumpulan foto perjalanan akademik, pengabdian, magang, dan kompetisi.",
            "A collection of moments from academic journeys, community service, internships, and competitions.",
            language,
          )}
        </p>
      </header>

      {/* Search + Filter toolbar */}
      <div className="mt-8 mb-6 flex items-center gap-2">
        <SearchBar
          value={search}
          onChange={setSearch}
          language={language}
          placeholder={{ id: "Cari aktivitas, keyword...", en: "Search activity, keyword..." }}
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
          {tr(`${current.length} foto ditemukan`, `${current.length} photos found`, language)}
        </p>
      )}

      {/* Masonry */}
      {current.length > 0 ? (
        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 xl:columns-5">
          {current.map((i) => (
            <ActivityCard key={i.id} item={i} onClick={() => setSelected(i)} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
          {tr("Tidak ada foto yang cocok.", "No matching photos found.", language)}
        </div>
      )}

      <ActivityLightbox item={selected} onClose={() => setSelected(null)} />

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
              { value: "default", label: tr("Default", "Default", language) },
              { value: "az", label: "A – Z" },
            ]}
          />
        </FilterSection>

        <FilterSection label={tr("Filter Keyword", "Filter by Keyword", language)}>
          <FilterChipGroup
            options={popular.map((k) => ({ value: k, label: k }))}
            selected={keywordFilter}
            onToggle={toggleKeyword}
          />
        </FilterSection>
      </FilterSidebar>
    </div>
  );
}
