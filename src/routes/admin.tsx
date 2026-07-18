import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Lock,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  Loader2,
  Check,
  ChevronRight,
  FolderOpen,
  Briefcase,
  Brain,
  Trophy,
  Image as ImageIcon,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Home,
  Mail,
} from "lucide-react";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

import {
  loginFn,
  logoutFn,
  checkAuthStatusFn,
  getProjectsFn,
  upsertProjectFn,
  deleteProjectFn,
  getExperiencesFn,
  upsertExperienceFn,
  deleteExperienceFn,
  getAiItemsFn,
  upsertAiItemFn,
  deleteAiItemFn,
  getAchievementsFn,
  upsertAchievementFn,
  deleteAchievementFn,
  getActivitiesFn,
  upsertActivityFn,
  deleteActivityFn,
  getSystemLogsFn,
  clearSystemLogsFn,
  getHomepageFn,
  updateHomepageFn,
  uploadImageFn,
  getContactMessagesFn,
  deleteContactMessageFn,
} from "@/lib/admin-server";

import type { Project } from "@/data/projects";
import type { Experience } from "@/data/experiences";
import type { AiItem } from "@/data/ai-data";
import type { AchievementItem } from "@/data/achievements";
import type { ActivityItem } from "@/data/activities";
import type { SystemLog, AnomalyAlert, HomepageData, ContactMessage } from "@/lib/data-service.server";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type TabType = "projects" | "experiences" | "ai" | "achievements" | "activities" | "logs" | "homepage" | "inbox";

function AdminPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [searchTerm, setSearchTerm] = useState("");

  // Data lists
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [aiItems, setAiItems] = useState<AiItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [anomalies, setAnomalies] = useState<AnomalyAlert[]>([]);
  const [homepageData, setHomepageData] = useState<any>(null);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Modal forms
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<"create" | "edit">("create");

  // Check auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await checkAuthStatusFn();
        setIsAuthenticated(res.authenticated);
        if (res.authenticated) {
          fetchData(activeTab);
        }
      } catch (e) {
        console.error("Auth check failed", e);
      } finally {
        setAuthChecking(false);
      }
    }
    checkAuth();
  }, [activeTab]);

  // Fetch data list based on tab
  async function fetchData(tab: TabType) {
    setDataLoading(true);
    try {
      if (tab === "projects") {
        const res = await getProjectsFn();
        setProjects(res);
      } else if (tab === "experiences") {
        const res = await getExperiencesFn();
        setExperiences(res);
      } else if (tab === "ai") {
        const res = await getAiItemsFn();
        setAiItems(res);
      } else if (tab === "achievements") {
        const res = await getAchievementsFn();
        setAchievements(res);
      } else if (tab === "activities") {
        const res = await getActivitiesFn();
        setActivities(res);
      } else if (tab === "logs") {
        const res = await getSystemLogsFn();
        setLogs(res.logs);
        setAnomalies(res.anomalies);
      } else if (tab === "homepage") {
        const res = await getHomepageFn();
        setHomepageData(res);
      } else if (tab === "inbox") {
        const res = await getContactMessagesFn();
        setContactMessages(res);
      }
    } catch (e) {
      toast.error("Gagal mengambil data dari server");
    } finally {
      setDataLoading(false);
    }
  }

  // Handle PIN entry
  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!pin) return;
    setLoading(true);
    try {
      const res = await loginFn({ data: pin });
      if (res.success) {
        setIsAuthenticated(true);
        toast.success("Login berhasil! Selamat datang Admin.");
        fetchData(activeTab);
      } else {
        toast.error(res.error || "Gagal masuk");
        setPin("");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logoutFn();
      setIsAuthenticated(false);
      setPin("");
      toast.success("Anda telah keluar.");
    } catch (e) {
      toast.error("Gagal keluar");
    } finally {
      setLoading(false);
    }
  }

  // Keypad numbers click handler
  const handleKeypadPress = (val: string) => {
    if (val === "clear") {
      setPin("");
    } else if (val === "back") {
      setPin((prev) => prev.slice(0, -1));
    } else {
      if (pin.length < 16) {
        setPin((prev) => prev + val);
      }
    }
  };

  // Switch tabs
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchTerm("");
    fetchData(tab);
  };

  // Filtered lists
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [projects, searchTerm]);

  const filteredExperiences = useMemo(() => {
    return experiences.filter(
      (e) =>
        e.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.role.id.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [experiences, searchTerm]);

  const filteredAiItems = useMemo(() => {
    return aiItems.filter((i) => i.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [aiItems, searchTerm]);

  const filteredAchievements = useMemo(() => {
    return achievements.filter((a) => a.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [achievements, searchTerm]);

  const filteredActivities = useMemo(() => {
    return activities.filter((a) =>
      a.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [activities, searchTerm]);

  const filteredLogs = useMemo(() => {
    return logs.filter(
      (l) =>
        l.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.ip.includes(searchTerm) ||
        l.type.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [logs, searchTerm]);

  async function handleClearLogs() {
    if (!confirm("Apakah Anda yakin ingin menghapus seluruh log sistem?")) return;
    setLoading(true);
    try {
      await clearSystemLogsFn();
      toast.success("Log sistem berhasil dibersihkan!");
      fetchData("logs");
    } catch (e: any) {
      toast.error(e.message || "Gagal membersihkan log");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveHomepage() {
    if (!homepageData) return;
    setLoading(true);
    try {
      await updateHomepageFn({ data: homepageData });
      toast.success("Konten Beranda berhasil diperbarui!");
      fetchData("homepage");
    } catch (e: any) {
      toast.error(e.message || "Gagal menyimpan konten beranda");
    } finally {
      setLoading(false);
    }
  }

  const filteredContactMessages = useMemo(() => {
    return contactMessages.filter(
      (m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.ip.includes(searchTerm),
    );
  }, [contactMessages, searchTerm]);

  async function handleDeleteContactMessage(id: number) {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini secara permanen dari database?")) return;
    setLoading(true);
    try {
      await deleteContactMessageFn({ data: id });
      toast.success("Pesan masuk berhasil dihapus!");
      fetchData("inbox");
    } catch (e: any) {
      toast.error(e.message || "Gagal menghapus pesan");
    } finally {
      setLoading(false);
    }
  }

  // Form submit handler
  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === "projects") {
        await upsertProjectFn({ data: editingItem });
      } else if (activeTab === "experiences") {
        await upsertExperienceFn({ data: editingItem });
      } else if (activeTab === "ai") {
        await upsertAiItemFn({ data: editingItem });
      } else if (activeTab === "achievements") {
        await upsertAchievementFn({ data: editingItem });
      } else if (activeTab === "activities") {
        await upsertActivityFn({ data: editingItem });
      }
      toast.success(formType === "create" ? "Data berhasil dibuat!" : "Data berhasil diperbarui!");
      setIsFormOpen(false);
      setEditingItem(null);
      fetchData(activeTab);
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  }

  // Delete handler
  async function handleDelete(id: number) {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    setLoading(true);
    try {
      if (activeTab === "projects") {
        await deleteProjectFn({ data: id });
      } else if (activeTab === "experiences") {
        await deleteExperienceFn({ data: id });
      } else if (activeTab === "ai") {
        await deleteAiItemFn({ data: id });
      } else if (activeTab === "achievements") {
        await deleteAchievementFn({ data: id });
      } else if (activeTab === "activities") {
        await deleteActivityFn({ data: id });
      }
      toast.success("Data berhasil dihapus!");
      fetchData(activeTab);
    } catch (err: any) {
      toast.error(err.message || "Gagal menghapus data");
    } finally {
      setLoading(false);
    }
  }

  // Open create form
  function handleOpenCreate() {
    setFormType("create");
    if (activeTab === "projects") {
      setEditingItem({
        title: "",
        slug: "",
        category: "web",
        subcategories: [],
        type: "personal",
        partner: "",
        role: { id: "", en: "" },
        period: "",
        status: { id: "", en: "" },
        shortDesc: { id: "", en: "" },
        overview: { id: "", en: "" },
        challenges: { id: "", en: "" },
        lessons: { id: "", en: "" },
        techStack: [],
        features: { id: [], en: [] },
        demoUrl: "",
        repoUrl: "",
      });
    } else if (activeTab === "experiences") {
      setEditingItem({
        company: "",
        location: "",
        role: { id: "", en: "" },
        period: { id: "", en: "" },
        duration: { id: "", en: "" },
        status: { id: "", en: "" },
        workType: { id: "", en: "" },
        tasks: [],
        learnings: [],
        impact: [],
      });
    } else if (activeTab === "ai") {
      setEditingItem({
        slug: "",
        category: "model",
        title: "",
        subtitle: { id: "", en: "" },
        description: { id: "", en: "" },
        keywords: [],
        status: "online",
        domain: "",
        metrics: [],
        volume: "",
        runtime: [],
        thumbnail: "",
        demoUrl: "",
        repoUrl: "",
      });
    } else if (activeTab === "achievements") {
      setEditingItem({
        slug: "",
        category: "certification",
        title: "",
        subtitle: { id: "", en: "" },
        description: { id: "", en: "" },
        keywords: [],
        year: new Date().getFullYear(),
        issuer: "",
        publicationType: "research",
        journal: "",
        thumbnail: "",
        certificateUrl: "",
        doiUrl: "",
      });
    } else if (activeTab === "activities") {
      setEditingItem({
        image: "",
        ratio: "4/3",
        keywords: [],
        alt: { id: "", en: "" },
      });
    }
    setIsFormOpen(true);
  }

  // Open edit form
  function handleOpenEdit(item: any) {
    setFormType("edit");
    setEditingItem({ ...item });
    setIsFormOpen(true);
  }

  if (authChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  // 1. LOGIN UI
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Subtle grid in background */}
        <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden opacity-30">
          <div
            className="absolute inset-[-30%] bg-repeat"
            style={{
              backgroundSize: "40px 40px",
              backgroundImage: "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
              transform: "rotate(6deg)",
            }}
          />
        </div>

        <div className="w-full max-w-md rounded-3xl border border-border/80 bg-card/75 p-8 shadow-xl backdrop-blur-md">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground">
              Dashboard Admin
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Masukkan PIN Anda untuk mengelola isi portofolio
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-center font-mono text-xl tracking-widest text-foreground outline-none focus:border-accent"
            />

            {/* Virtual Keypad */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeypadPress(num)}
                  className="flex h-14 items-center justify-center rounded-2xl border border-border/60 bg-background/50 text-lg font-bold text-foreground transition-all active:scale-95 active:bg-secondary hover:border-accent"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleKeypadPress("clear")}
                className="flex h-14 items-center justify-center rounded-2xl bg-destructive/10 text-xs font-semibold text-destructive transition-all active:scale-95 active:bg-destructive/20"
              >
                CLEAR
              </button>
              <button
                type="button"
                onClick={() => handleKeypadPress("0")}
                className="flex h-14 items-center justify-center rounded-2xl border border-border/60 bg-background/50 text-lg font-bold text-foreground transition-all active:scale-95 active:bg-secondary hover:border-accent"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => handleKeypadPress("back")}
                className="flex h-14 items-center justify-center rounded-2xl bg-secondary text-xs font-semibold text-foreground transition-all active:scale-95 active:bg-secondary/80"
              >
                DELETE
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || !pin}
              className="mt-6 w-full gap-2 rounded-2xl py-3.5 bg-accent text-accent-foreground font-semibold flex items-center justify-center transition-all hover:opacity-90 active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Check className="h-4 w-4" /> Masuk
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD MAIN UI
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-md">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground">Admin Workspace</h1>
              <p className="text-[10px] text-muted-foreground">Status: Terautentikasi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Buka Portofolio <ExternalLink className="h-3 w-3" />
            </a>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/20"
            >
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LogOut className="h-3.5 w-3.5" />}
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-4">
        {/* Sidebar Nav */}
        {/* Sidebar Nav */}
        <aside className="space-y-1.5 md:col-span-1">
          <h2 className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Kelola Konten
          </h2>
          {[
            { id: "homepage", label: "Beranda", icon: Home },
            { id: "projects", label: "Proyek", icon: FolderOpen },
            { id: "experiences", label: "Karir / Pengalaman", icon: Briefcase },
            { id: "ai", label: "AI & Data", icon: Brain },
            { id: "achievements", label: "Pencapaian", icon: Trophy },
            { id: "activities", label: "Aktivitas", icon: ImageIcon },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id as TabType)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all text-left",
                  active
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="h-4.5 w-4.5" />
                {t.label}
              </button>
            );
          })}

          <h2 className="px-3 pt-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Keamanan & Komunikasi
          </h2>
          <button
            onClick={() => handleTabChange("inbox")}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all text-left",
              activeTab === "inbox"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Mail className="h-4.5 w-4.5" />
            Pesan Masuk (Inbox)
          </button>
          <button
            onClick={() => handleTabChange("logs")}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all text-left",
              activeTab === "logs"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Shield className="h-4.5 w-4.5" />
            Log & Keamanan
          </button>
        </aside>

        {/* Content Panel */}
        <main className="space-y-6 md:col-span-3">
          {activeTab !== "homepage" && (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={
                      activeTab === "logs"
                        ? "Cari log, IP, rincian..."
                        : activeTab === "inbox"
                          ? "Cari nama, subjek, pesan..."
                          : "Cari item..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-background py-2 pl-9 pr-4 text-sm text-foreground outline-none focus:border-accent"
                  />
                </div>
              </div>
              {activeTab !== "logs" && activeTab !== "inbox" && (
                <button
                  onClick={handleOpenCreate}
                  className="inline-flex items-center gap-2 rounded-2xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow transition-transform active:scale-95 hover:opacity-90"
                >
                  <Plus className="h-4 w-4" /> Tambah Data
                </button>
              )}
            </div>
          )}

          {/* Table list or Logs Viewer or Homepage Editor or Inbox Viewer */}
          {activeTab === "homepage" ? (
            <HomepageEditor
              data={homepageData}
              onChange={setHomepageData}
              onSave={handleSaveHomepage}
              loading={dataLoading}
            />
          ) : activeTab === "inbox" ? (
            <InboxViewer
              list={filteredContactMessages}
              onDelete={handleDeleteContactMessage}
              loading={dataLoading}
            />
          ) : activeTab === "logs" ? (
            <LogsViewer
              list={filteredLogs}
              anomalies={anomalies}
              onClear={handleClearLogs}
              loading={dataLoading}
            />
          ) : (
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              {dataLoading ? (
                <div className="flex py-20 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-accent" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  {activeTab === "projects" && (
                    <ProjectsTable list={filteredProjects} onEdit={handleOpenEdit} onDelete={handleDelete} />
                  )}
                  {activeTab === "experiences" && (
                    <ExperiencesTable list={filteredExperiences} onEdit={handleOpenEdit} onDelete={handleDelete} />
                  )}
                  {activeTab === "ai" && (
                    <AiItemsTable list={filteredAiItems} onEdit={handleOpenEdit} onDelete={handleDelete} />
                  )}
                  {activeTab === "achievements" && (
                    <AchievementsTable list={filteredAchievements} onEdit={handleOpenEdit} onDelete={handleDelete} />
                  )}
                  {activeTab === "activities" && (
                    <ActivitiesTable list={filteredActivities} onEdit={handleOpenEdit} onDelete={handleDelete} />
                  )}

                  {/* Empty State */}
                  {((activeTab === "projects" && filteredProjects.length === 0) ||
                    (activeTab === "experiences" && filteredExperiences.length === 0) ||
                    (activeTab === "ai" && filteredAiItems.length === 0) ||
                    (activeTab === "achievements" && filteredAchievements.length === 0) ||
                    (activeTab === "activities" && filteredActivities.length === 0)) && (
                      <div className="py-16 text-center text-sm text-muted-foreground font-sans">
                        Tidak ada item yang cocok dengan pencarian Anda.
                      </div>
                    )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* 3. CRUD FORM MODAL */}
      {isFormOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl rounded-3xl border border-border bg-card p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
            <h3 className="font-display text-2xl font-bold text-foreground">
              {formType === "create" ? "Tambah Data Baru" : "Edit Item"} —{" "}
              {activeTab === "projects" && "Proyek"}
              {activeTab === "experiences" && "Pengalaman"}
              {activeTab === "ai" && "AI & Data"}
              {activeTab === "achievements" && "Pencapaian"}
              {activeTab === "activities" && "Aktivitas"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Semua kolom bertanda * wajib diisi. Input bilingual dipisah ke kolom kiri (ID) dan kanan (EN).
            </p>

            <form onSubmit={handleFormSubmit} className="mt-6 space-y-6">
              {activeTab === "projects" && (
                <ProjectForm fields={editingItem} setFields={setEditingItem} />
              )}
              {activeTab === "experiences" && (
                <ExperienceForm fields={editingItem} setFields={setEditingItem} />
              )}
              {activeTab === "ai" && (
                <AiItemForm fields={editingItem} setFields={setEditingItem} />
              )}
              {activeTab === "achievements" && (
                <AchievementForm fields={editingItem} setFields={setEditingItem} />
              )}
              {activeTab === "activities" && (
                <ActivityForm fields={editingItem} setFields={setEditingItem} />
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-border/60 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingItem(null);
                  }}
                  className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow transition-transform active:scale-95 hover:opacity-90"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// TABLES COMPONENTS
// ============================================

function ProjectsTable({ list, onEdit, onDelete }: { list: Project[]; onEdit: any; onDelete: any }) {
  return (
    <table className="w-full text-left border-collapse text-sm">
      <thead>
        <tr className="border-b border-border/80 bg-secondary/30 text-muted-foreground font-semibold">
          <th className="p-4 w-12">ID</th>
          <th className="p-4">Proyek</th>
          <th className="p-4">Kategori</th>
          <th className="p-4">Tipe</th>
          <th className="p-4">Periode</th>
          <th className="p-4 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/60">
        {list.map((item) => (
          <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
            <td className="p-4 font-bold text-muted-foreground">{item.id}</td>
            <td className="p-4 font-semibold text-foreground">{item.title}</td>
            <td className="p-4 uppercase text-xs font-bold text-accent">{item.category}</td>
            <td className="p-4 capitalize">{item.type}</td>
            <td className="p-4 text-muted-foreground">{item.period}</td>
            <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
              <button
                onClick={() => onEdit(item)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                title="Edit"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Hapus"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ExperiencesTable({ list, onEdit, onDelete }: { list: Experience[]; onEdit: any; onDelete: any }) {
  return (
    <table className="w-full text-left border-collapse text-sm">
      <thead>
        <tr className="border-b border-border/80 bg-secondary/30 text-muted-foreground font-semibold">
          <th className="p-4 w-12">ID</th>
          <th className="p-4">Perusahaan</th>
          <th className="p-4">Peran (ID)</th>
          <th className="p-4">Jenis</th>
          <th className="p-4">Durasi</th>
          <th className="p-4 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/60">
        {list.map((item) => (
          <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
            <td className="p-4 font-bold text-muted-foreground">{item.id}</td>
            <td className="p-4 font-semibold text-foreground">{item.company}</td>
            <td className="p-4 text-muted-foreground">{item.role.id}</td>
            <td className="p-4 text-xs font-semibold uppercase">{item.workType.id}</td>
            <td className="p-4">{item.duration.id}</td>
            <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
              <button
                onClick={() => onEdit(item)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                title="Edit"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(item.id!)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Hapus"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AiItemsTable({ list, onEdit, onDelete }: { list: AiItem[]; onEdit: any; onDelete: any }) {
  return (
    <table className="w-full text-left border-collapse text-sm">
      <thead>
        <tr className="border-b border-border/80 bg-secondary/30 text-muted-foreground font-semibold">
          <th className="p-4 w-12">ID</th>
          <th className="p-4">Item</th>
          <th className="p-4">Kategori</th>
          <th className="p-4">Domain</th>
          <th className="p-4">Status</th>
          <th className="p-4 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/60">
        {list.map((item) => (
          <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
            <td className="p-4 font-bold text-muted-foreground">{item.id}</td>
            <td className="p-4 font-semibold text-foreground">{item.title}</td>
            <td className="p-4 uppercase text-xs font-bold text-accent">{item.category}</td>
            <td className="p-4 text-muted-foreground text-xs">{item.domain || "-"}</td>
            <td className="p-4 capitalize text-xs">{item.status}</td>
            <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
              <button
                onClick={() => onEdit(item)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                title="Edit"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Hapus"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AchievementsTable({ list, onEdit, onDelete }: { list: AchievementItem[]; onEdit: any; onDelete: any }) {
  return (
    <table className="w-full text-left border-collapse text-sm">
      <thead>
        <tr className="border-b border-border/80 bg-secondary/30 text-muted-foreground font-semibold">
          <th className="p-4 w-12">ID</th>
          <th className="p-4">Pencapaian</th>
          <th className="p-4">Kategori</th>
          <th className="p-4">Penerbit / Jurnal</th>
          <th className="p-4">Tahun</th>
          <th className="p-4 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/60">
        {list.map((item) => (
          <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
            <td className="p-4 font-bold text-muted-foreground">{item.id}</td>
            <td className="p-4 font-semibold text-foreground">{item.title}</td>
            <td className="p-4 capitalize text-xs">{item.category}</td>
            <td className="p-4 text-muted-foreground text-xs">{item.issuer || item.journal || "-"}</td>
            <td className="p-4 font-semibold">{item.year}</td>
            <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
              <button
                onClick={() => onEdit(item)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                title="Edit"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Hapus"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ActivitiesTable({ list, onEdit, onDelete }: { list: ActivityItem[]; onEdit: any; onDelete: any }) {
  return (
    <table className="w-full text-left border-collapse text-sm">
      <thead>
        <tr className="border-b border-border/80 bg-secondary/30 text-muted-foreground font-semibold">
          <th className="p-4 w-12">ID</th>
          <th className="p-4 w-20">Gambar</th>
          <th className="p-4">Deskripsi (ID)</th>
          <th className="p-4">Rasio</th>
          <th className="p-4">Keywords</th>
          <th className="p-4 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/60">
        {list.map((item) => (
          <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
            <td className="p-4 font-bold text-muted-foreground">{item.id}</td>
            <td className="p-4">
              <img
                src={item.image}
                alt={item.alt.id}
                className="h-10 w-10 rounded-lg object-cover border border-border"
              />
            </td>
            <td className="p-4 font-semibold text-foreground">{item.alt.id}</td>
            <td className="p-4 font-mono text-xs">{item.ratio}</td>
            <td className="p-4 text-xs text-muted-foreground">{item.keywords.join(", ")}</td>
            <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
              <button
                onClick={() => onEdit(item)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                title="Edit"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Hapus"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ============================================
// CRUD FORMS SUB-COMPONENTS (Bilingual side-by-side)
// ============================================

function FormRowBilingual({
  label,
  idVal,
  enVal,
  onChangeId,
  onChangeEn,
  placeholderId = "",
  placeholderEn = "",
  textarea = false,
}: {
  label: string;
  idVal: string;
  enVal: string;
  onChangeId: (v: string) => void;
  onChangeEn: (v: string) => void;
  placeholderId?: string;
  placeholderEn?: string;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-foreground block">{label}</label>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Indonesia</span>
          {textarea ? (
            <textarea
              value={idVal}
              onChange={(e) => onChangeId(e.target.value)}
              placeholder={placeholderId}
              rows={4}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          ) : (
            <input
              type="text"
              value={idVal}
              onChange={(e) => onChangeId(e.target.value)}
              placeholder={placeholderId}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          )}
        </div>
        <div>
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">English</span>
          {textarea ? (
            <textarea
              value={enVal}
              onChange={(e) => onChangeEn(e.target.value)}
              placeholder={placeholderEn}
              rows={4}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          ) : (
            <input
              type="text"
              value={enVal}
              onChange={(e) => onChangeEn(e.target.value)}
              placeholder={placeholderEn}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectForm({ fields, setFields }: { fields: Project; setFields: any }) {
  const updateBilingual = (key: keyof Project, subkey: "id" | "en", value: string) => {
    setFields((prev: any) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [subkey]: value,
      },
    }));
  };

  const updateArray = (key: keyof Project, text: string) => {
    const arr = text.split(",").map((s) => s.trim()).filter(Boolean);
    setFields((prev: any) => ({
      ...prev,
      [key]: arr,
    }));
  };

  // Convert features array list to textarea lines
  const featuresIdText = fields.features?.id?.join("\n") || "";
  const featuresEnText = fields.features?.en?.join("\n") || "";

  const handleFeaturesChange = (lang: "id" | "en", text: string) => {
    const list = text.split("\n").map((s) => s.trim()).filter(Boolean);
    setFields((prev: any) => ({
      ...prev,
      features: {
        ...prev.features,
        [lang]: list,
      },
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold text-foreground block">Judul Proyek *</label>
          <input
            type="text"
            required
            value={fields.title}
            onChange={(e) => {
              const val = e.target.value;
              const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              setFields((prev: any) => ({ ...prev, title: val, slug }));
            }}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Slug URL *</label>
          <input
            type="text"
            required
            value={fields.slug}
            onChange={(e) => setFields((prev: any) => ({ ...prev, slug: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-xs font-bold text-foreground block">Kategori *</label>
          <select
            value={fields.category}
            onChange={(e) => setFields((prev: any) => ({ ...prev, category: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          >
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="uiux">UI/UX</option>
            <option value="app">Desktop/General App</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Tipe Proyek *</label>
          <select
            value={fields.type}
            onChange={(e) => setFields((prev: any) => ({ ...prev, type: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          >
            <option value="internship">Magang (Internship)</option>
            <option value="freelance">Freelance</option>
            <option value="personal">Personal Project</option>
            <option value="competition">Kompetisi</option>
            <option value="academic">Akademik</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Partner / Institusi</label>
          <input
            type="text"
            value={fields.partner}
            onChange={(e) => setFields((prev: any) => ({ ...prev, partner: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold text-foreground block">Periode * (Contoh: Mar 2025 - Jan 2026)</label>
          <input
            type="text"
            required
            value={fields.period}
            onChange={(e) => setFields((prev: any) => ({ ...prev, period: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div className="grid gap-2 grid-cols-2">
          <div>
            <label className="text-xs font-bold text-foreground block">Demo URL</label>
            <input
              type="text"
              value={fields.demoUrl || ""}
              onChange={(e) => setFields((prev: any) => ({ ...prev, demoUrl: e.target.value }))}
              placeholder="https://..."
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-foreground block">Repository URL</label>
            <input
              type="text"
              value={fields.repoUrl || ""}
              onChange={(e) => setFields((prev: any) => ({ ...prev, repoUrl: e.target.value }))}
              placeholder="https://github.com/..."
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      <FormRowBilingual
        label="Peran / Keterlibatan *"
        idVal={fields.role.id}
        enVal={fields.role.en}
        onChangeId={(v) => updateBilingual("role", "id", v)}
        onChangeEn={(v) => updateBilingual("role", "en", v)}
        placeholderId="Contoh: Lead Full-Stack Developer"
        placeholderEn="Example: Lead Full-Stack Developer"
      />

      <FormRowBilingual
        label="Status Rilis *"
        idVal={fields.status.id}
        enVal={fields.status.en}
        onChangeId={(v) => updateBilingual("status", "id", v)}
        onChangeEn={(v) => updateBilingual("status", "en", v)}
        placeholderId="Contoh: Rilis Publik / Online"
        placeholderEn="Example: Public Release / Online"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold text-foreground block">Sub-Kategori (Pisahkan dengan koma)</label>
          <input
            type="text"
            value={fields.subcategories.join(", ")}
            onChange={(e) => updateArray("subcategories", e.target.value)}
            placeholder="Contoh: Healthcare, Telemedicine, AI"
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Tech Stack (Pisahkan dengan koma)</label>
          <input
            type="text"
            value={fields.techStack.join(", ")}
            onChange={(e) => updateArray("techStack", e.target.value)}
            placeholder="Contoh: Laravel, PHP, React, MySQL"
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>

      <FormRowBilingual
        label="Deskripsi Singkat * (Maks 2 kalimat)"
        idVal={fields.shortDesc.id}
        enVal={fields.shortDesc.en}
        onChangeId={(v) => updateBilingual("shortDesc", "id", v)}
        onChangeEn={(v) => updateBilingual("shortDesc", "en", v)}
        textarea
      />

      <FormRowBilingual
        label="Ringkasan / Overview *"
        idVal={fields.overview.id}
        enVal={fields.overview.en}
        onChangeId={(v) => updateBilingual("overview", "id", v)}
        onChangeEn={(v) => updateBilingual("overview", "en", v)}
        textarea
      />

      <FormRowBilingual
        label="Tantangan *"
        idVal={fields.challenges.id}
        enVal={fields.challenges.en}
        onChangeId={(v) => updateBilingual("challenges", "id", v)}
        onChangeEn={(v) => updateBilingual("challenges", "en", v)}
        textarea
      />

      <FormRowBilingual
        label="Pelajaran Yang Didapat *"
        idVal={fields.lessons.id}
        enVal={fields.lessons.en}
        onChangeId={(v) => updateBilingual("lessons", "id", v)}
        onChangeEn={(v) => updateBilingual("lessons", "en", v)}
        textarea
      />

      {/* Features Lists (Bilingual line by line) */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-foreground block">Daftar Fitur Utama (Satu baris per fitur)</label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">ID (Satu per baris)</span>
            <textarea
              value={featuresIdText}
              onChange={(e) => handleFeaturesChange("id", e.target.value)}
              placeholder="Fitur 1&#10;Fitur 2&#10;Fitur 3"
              rows={5}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent font-sans"
            />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">EN (Satu per baris)</span>
            <textarea
              value={featuresEnText}
              onChange={(e) => handleFeaturesChange("en", e.target.value)}
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              rows={5}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent font-sans"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceForm({ fields, setFields }: { fields: Experience; setFields: any }) {
  const updateBilingual = (key: keyof Experience, subkey: "id" | "en", value: string) => {
    setFields((prev: any) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [subkey]: value,
      },
    }));
  };

  const handleListChange = (key: "tasks" | "learnings" | "impact", lang: "id" | "en", text: string) => {
    const list = text.split("\n").map((s) => s.trim()).filter(Boolean);
    setFields((prev: any) => {
      const copy = [...(prev[key] || [])];
      // ensure we have enough items
      while (copy.length < list.length) {
        copy.push({ id: "", en: "" });
      }
      list.forEach((val, idx) => {
        copy[idx] = {
          ...copy[idx],
          [lang]: val,
        };
      });
      // truncate extra items
      copy.length = list.length;
      return {
        ...prev,
        [key]: copy,
      };
    });
  };

  const getListText = (key: "tasks" | "learnings" | "impact", lang: "id" | "en") => {
    return (fields[key] || []).map((x: any) => x[lang] || "").join("\n");
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold text-foreground block">Perusahaan / Institusi *</label>
          <input
            type="text"
            required
            value={fields.company}
            onChange={(e) => setFields((prev: any) => ({ ...prev, company: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Lokasi * (Contoh: Yogyakarta, Indonesia)</label>
          <input
            type="text"
            required
            value={fields.location}
            onChange={(e) => setFields((prev: any) => ({ ...prev, location: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>

      <FormRowBilingual
        label="Peran / Jabatan *"
        idVal={fields.role.id}
        enVal={fields.role.en}
        onChangeId={(v) => updateBilingual("role", "id", v)}
        onChangeEn={(v) => updateBilingual("role", "en", v)}
        placeholderId="Contoh: Full-Stack Developer Intern"
        placeholderEn="Example: Full-Stack Developer Intern"
      />

      <FormRowBilingual
        label="Periode Kerja *"
        idVal={fields.period.id}
        enVal={fields.period.en}
        onChangeId={(v) => updateBilingual("period", "id", v)}
        onChangeEn={(v) => updateBilingual("period", "en", v)}
        placeholderId="Contoh: Maret 2025 - Januari 2026"
        placeholderEn="Example: March 2025 - January 2026"
      />

      <FormRowBilingual
        label="Durasi *"
        idVal={fields.duration.id}
        enVal={fields.duration.en}
        onChangeId={(v) => updateBilingual("duration", "id", v)}
        onChangeEn={(v) => updateBilingual("duration", "en", v)}
        placeholderId="Contoh: 11 bulan"
        placeholderEn="Example: 11 months"
      />

      <FormRowBilingual
        label="Status Hubungan Kerja *"
        idVal={fields.status.id}
        enVal={fields.status.en}
        onChangeId={(v) => updateBilingual("status", "id", v)}
        onChangeEn={(v) => updateBilingual("status", "en", v)}
        placeholderId="Contoh: Magang / Kontrak"
        placeholderEn="Example: Internship / Contract"
      />

      <FormRowBilingual
        label="Jenis Lokasi Kerja *"
        idVal={fields.workType.id}
        enVal={fields.workType.en}
        onChangeId={(v) => updateBilingual("workType", "id", v)}
        onChangeEn={(v) => updateBilingual("workType", "en", v)}
        placeholderId="Contoh: Remote / Onsite"
        placeholderEn="Example: Remote / Onsite"
      />

      {/* Lists (Tasks, Learnings, Impact) */}
      <div className="space-y-4 border-t border-border/40 pt-4">
        <div>
          <label className="text-xs font-bold text-foreground block">Tugas & Tanggung Jawab (Satu baris per tugas)</label>
          <div className="grid gap-4 sm:grid-cols-2 mt-1">
            <textarea
              value={getListText("tasks", "id")}
              onChange={(e) => handleListChange("tasks", "id", e.target.value)}
              placeholder="Tugas 1&#10;Tugas 2"
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
            <textarea
              value={getListText("tasks", "en")}
              onChange={(e) => handleListChange("tasks", "en", e.target.value)}
              placeholder="Task 1&#10;Task 2"
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-foreground block">Yang Dipelajari (Satu baris per poin)</label>
          <div className="grid gap-4 sm:grid-cols-2 mt-1">
            <textarea
              value={getListText("learnings", "id")}
              onChange={(e) => handleListChange("learnings", "id", e.target.value)}
              placeholder="Pelajaran 1&#10;Pelajaran 2"
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
            <textarea
              value={getListText("learnings", "en")}
              onChange={(e) => handleListChange("learnings", "en", e.target.value)}
              placeholder="Learning 1&#10;Learning 2"
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-foreground block">Dampak / Hasil Pekerjaan (Satu baris per poin)</label>
          <div className="grid gap-4 sm:grid-cols-2 mt-1">
            <textarea
              value={getListText("impact", "id")}
              onChange={(e) => handleListChange("impact", "id", e.target.value)}
              placeholder="Dampak 1&#10;Dampak 2"
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
            <textarea
              value={getListText("impact", "en")}
              onChange={(e) => handleListChange("impact", "en", e.target.value)}
              placeholder="Impact 1&#10;Impact 2"
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AiItemForm({ fields, setFields }: { fields: AiItem; setFields: any }) {
  const updateBilingual = (key: keyof AiItem, subkey: "id" | "en", value: string) => {
    setFields((prev: any) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [subkey]: value,
      },
    }));
  };

  const updateArray = (key: keyof AiItem, text: string) => {
    const arr = text.split(",").map((s) => s.trim()).filter(Boolean);
    setFields((prev: any) => ({
      ...prev,
      [key]: arr,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold text-foreground block">Nama Item / Model *</label>
          <input
            type="text"
            required
            value={fields.title}
            onChange={(e) => {
              const val = e.target.value;
              const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              setFields((prev: any) => ({ ...prev, title: val, slug }));
            }}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Slug URL *</label>
          <input
            type="text"
            required
            value={fields.slug}
            onChange={(e) => setFields((prev: any) => ({ ...prev, slug: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-xs font-bold text-foreground block">Kategori *</label>
          <select
            value={fields.category}
            onChange={(e) => setFields((prev: any) => ({ ...prev, category: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          >
            <option value="model">Machine Learning Model</option>
            <option value="dataset">Scraped Dataset</option>
            <option value="tool">Developer Tool / Scraper</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Status Rilis *</label>
          <select
            value={fields.status}
            onChange={(e) => setFields((prev: any) => ({ ...prev, status: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          >
            <option value="online">Online</option>
            <option value="maintenance">Maintenance</option>
            <option value="archived">Archived</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Domain (Contoh: Tabular · Fraud)</label>
          <input
            type="text"
            value={fields.domain || ""}
            onChange={(e) => setFields((prev: any) => ({ ...prev, domain: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>

      <FormRowBilingual
        label="Sub-Judul / Subtitle *"
        idVal={fields.subtitle.id}
        enVal={fields.subtitle.en}
        onChangeId={(v) => updateBilingual("subtitle", "id", v)}
        onChangeEn={(v) => updateBilingual("subtitle", "en", v)}
        placeholderId="Contoh: Klasifikasi data tabular"
        placeholderEn="Example: Tabular data classification"
      />

      <FormRowBilingual
        label="Deskripsi Lengkap *"
        idVal={fields.description.id}
        enVal={fields.description.en}
        onChangeId={(v) => updateBilingual("description", "id", v)}
        onChangeEn={(v) => updateBilingual("description", "en", v)}
        textarea
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold text-foreground block">Keywords (Pisahkan dengan koma)</label>
          <input
            type="text"
            value={fields.keywords.join(", ")}
            onChange={(e) => updateArray("keywords", e.target.value)}
            placeholder="Contoh: GNN, PyTorch, Movie Recommendation"
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Metrik Akurasi / Performa (Pisahkan dengan koma)</label>
          <input
            type="text"
            value={(fields.metrics || []).join(", ")}
            onChange={(e) => updateArray("metrics", e.target.value)}
            placeholder="Contoh: Accuracy 94%, Precision 0.89"
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-xs font-bold text-foreground block">Volume / Ukuran Data (Contoh: 15,000 baris)</label>
          <input
            type="text"
            value={fields.volume || ""}
            onChange={(e) => setFields((prev: any) => ({ ...prev, volume: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Runtime / Stack (Pisahkan dengan koma)</label>
          <input
            type="text"
            value={(fields.runtime || []).join(", ")}
            onChange={(e) => updateArray("runtime", e.target.value)}
            placeholder="Contoh: Python, Streamlit"
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <ImageUpload
          value={fields.thumbnail || ""}
          onChange={(url) => setFields((prev: any) => ({ ...prev, thumbnail: url }))}
          label="Thumbnail Image URL"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold text-foreground block">Demo URL</label>
          <input
            type="text"
            value={fields.demoUrl || ""}
            onChange={(e) => setFields((prev: any) => ({ ...prev, demoUrl: e.target.value }))}
            placeholder="https://..."
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Repository URL</label>
          <input
            type="text"
            value={fields.repoUrl || ""}
            onChange={(e) => setFields((prev: any) => ({ ...prev, repoUrl: e.target.value }))}
            placeholder="https://github.com/..."
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>
    </div>
  );
}

function AchievementForm({ fields, setFields }: { fields: AchievementItem; setFields: any }) {
  const updateBilingual = (key: keyof AchievementItem, subkey: "id" | "en", value: string) => {
    setFields((prev: any) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [subkey]: value,
      },
    }));
  };

  const updateArray = (key: keyof AchievementItem, text: string) => {
    const arr = text.split(",").map((s) => s.trim()).filter(Boolean);
    setFields((prev: any) => ({
      ...prev,
      [key]: arr,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-bold text-foreground block">Nama Pencapaian *</label>
          <input
            type="text"
            required
            value={fields.title}
            onChange={(e) => {
              const val = e.target.value;
              const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              setFields((prev: any) => ({ ...prev, title: val, slug }));
            }}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Slug URL *</label>
          <input
            type="text"
            required
            value={fields.slug}
            onChange={(e) => setFields((prev: any) => ({ ...prev, slug: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-xs font-bold text-foreground block">Kategori *</label>
          <select
            value={fields.category}
            onChange={(e) => setFields((prev: any) => ({ ...prev, category: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          >
            <option value="certification">Sertifikasi (Certification)</option>
            <option value="award">Penghargaan (Award)</option>
            <option value="publication">Publikasi Jurnal (Publication)</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Tahun Penerbitan *</label>
          <input
            type="number"
            required
            value={fields.year}
            onChange={(e) => setFields((prev: any) => ({ ...prev, year: parseInt(e.target.value, 10) || new Date().getFullYear() }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Penerbit / Issuer (Contoh: BNSP / Kemenkumham)</label>
          <input
            type="text"
            value={fields.issuer || ""}
            onChange={(e) => setFields((prev: any) => ({ ...prev, issuer: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>

      {fields.category === "publication" && (
        <div className="grid gap-4 sm:grid-cols-2 border-l-2 border-accent pl-4 py-1 space-y-1">
          <div>
            <label className="text-xs font-bold text-foreground block">Jenis Publikasi</label>
            <select
              value={fields.publicationType || "research"}
              onChange={(e) => setFields((prev: any) => ({ ...prev, publicationType: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            >
              <option value="research">Riset (Research)</option>
              <option value="community">Pengabdian Masyarakat (Community Service)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-foreground block">Nama Jurnal (Contoh: Jurnal Teknik Informatika)</label>
            <input
              type="text"
              value={fields.journal || ""}
              onChange={(e) => setFields((prev: any) => ({ ...prev, journal: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>
        </div>
      )}

      <FormRowBilingual
        label="Sub-Judul / Institusi Tambahan *"
        idVal={fields.subtitle.id}
        enVal={fields.subtitle.en}
        onChangeId={(v) => updateBilingual("subtitle", "id", v)}
        onChangeEn={(v) => updateBilingual("subtitle", "en", v)}
        placeholderId="Contoh: Direktorat Jenderal Kekayaan Intelektual"
        placeholderEn="Example: Directorate General of Intellectual Property"
      />

      <FormRowBilingual
        label="Deskripsi Pencapaian *"
        idVal={fields.description.id}
        enVal={fields.description.en}
        onChangeId={(v) => updateBilingual("description", "id", v)}
        onChangeEn={(v) => updateBilingual("description", "en", v)}
        textarea
      />

      <div>
        <label className="text-xs font-bold text-foreground block">Keywords (Pisahkan dengan koma)</label>
        <input
          type="text"
          value={fields.keywords.join(", ")}
          onChange={(e) => updateArray("keywords", e.target.value)}
          placeholder="Contoh: HKI, Hak Cipta, BNSP"
          className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ImageUpload
          value={fields.thumbnail || ""}
          onChange={(url) => setFields((prev: any) => ({ ...prev, thumbnail: url }))}
          label="Thumbnail Image URL"
        />
        <div>
          <label className="text-xs font-bold text-foreground block">Certificate URL (PDF / File)</label>
          <input
            type="text"
            value={fields.certificateUrl || ""}
            onChange={(e) => setFields((prev: any) => ({ ...prev, certificateUrl: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">DOI / Publication Link</label>
          <input
            type="text"
            value={fields.doiUrl || ""}
            onChange={(e) => setFields((prev: any) => ({ ...prev, doiUrl: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>
    </div>
  );
}

function ActivityForm({ fields, setFields }: { fields: ActivityItem; setFields: any }) {
  const updateBilingual = (subkey: "id" | "en", value: string) => {
    setFields((prev: any) => ({
      ...prev,
      alt: {
        ...prev.alt,
        [subkey]: value,
      },
    }));
  };

  const updateArray = (text: string) => {
    const arr = text.split(",").map((s) => s.trim()).filter(Boolean);
    setFields((prev: any) => ({
      ...prev,
      keywords: arr,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <ImageUpload
            value={fields.image}
            onChange={(url) => setFields((prev: any) => ({ ...prev, image: url }))}
            label="Image URL *"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-foreground block">Rasio Dimensi Gambar *</label>
          <select
            value={fields.ratio}
            onChange={(e) => setFields((prev: any) => ({ ...prev, ratio: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          >
            <option value="1/1">1:1 (Square)</option>
            <option value="4/3">4:3 (Standard Photo)</option>
            <option value="3/4">3:4 (Portrait Standard)</option>
            <option value="16/9">16:9 (Landscape Wide)</option>
            <option value="9/16">9:16 (Portrait Tall)</option>
            <option value="3/2">3:2 (Classic DSLR)</option>
            <option value="2/3">2:3 (DSLR Portrait)</option>
          </select>
        </div>
      </div>

      <FormRowBilingual
        label="Keterangan Gambar / Alt Text *"
        idVal={fields.alt.id}
        enVal={fields.alt.en}
        onChangeId={(v) => updateBilingual("id", v)}
        onChangeEn={(v) => updateBilingual("en", v)}
        placeholderId="Contoh: Kegiatan KKN di Dabag"
        placeholderEn="Example: KKN activity at Dabag"
      />

      <div>
        <label className="text-xs font-bold text-foreground block">Keywords (Pisahkan dengan koma)</label>
        <input
          type="text"
          value={fields.keywords.join(", ")}
          onChange={(e) => updateArray(e.target.value)}
          placeholder="Contoh: KKN, Pengabdian, Dabag"
          className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>
    </div>
  );
}

// ============================================
// SYSTEM LOGS & SECURITY DASHBOARD COMPONENT
// ============================================

function LogsViewer({
  list,
  anomalies,
  onClear,
  loading,
}: {
  list: any[];
  anomalies: any[];
  onClear: () => void;
  loading: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* 1. ANOMALY DETECTION / SECURITY STATUS */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          {anomalies.length > 0 ? (
            <ShieldAlert className="h-5 w-5 text-destructive animate-pulse" />
          ) : (
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
          )}
          Status Deteksi Anomali & Keamanan
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Analisis otomatis log aktivitas sistem secara real-time untuk mitigasi serangan siber.
        </p>

        <div className="mt-4">
          {anomalies.length > 0 ? (
            <div className="space-y-3">
              {anomalies.map((alert, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-2xl border text-sm",
                    alert.severity === "danger"
                      ? "border-destructive/30 bg-destructive/10 text-destructive"
                      : "border-warning/30 bg-warning/10 text-warning-foreground"
                  )}
                >
                  <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block capitalize">
                      {alert.type.replace("_", " ")}
                    </span>
                    <p className="mt-1 text-xs opacity-90">{alert.message}</p>
                    <span className="text-[10px] opacity-75 mt-1 block">
                      Terdeteksi pada: {new Date(alert.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <div>
                <span className="font-bold block">Sistem Terlindungi</span>
                <p className="text-xs opacity-90">
                  Tidak ada anomali atau aktivitas mencurigakan (Brute Force / rapid CRUD / automation bot) terdeteksi dalam 30 menit terakhir.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. ACTIVITY LOGS LIST */}
      <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border/60 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <Terminal className="h-5 w-5 text-accent" /> Log Aktivitas Sistem
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Menampilkan riwayat login, modifikasi konten, dan aktivitas administrasi lainnya.
            </p>
          </div>
          <button
            onClick={onClear}
            disabled={loading || list.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/20 disabled:opacity-50 disabled:pointer-events-none"
          >
            Bersihkan Log
          </button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex py-20 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : list.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/80 bg-secondary/30 text-muted-foreground font-semibold">
                  <th className="p-4 w-12">ID</th>
                  <th className="p-4">Waktu</th>
                  <th className="p-4">Aktivitas</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Rincian</th>
                  <th className="p-4">Tingkat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-mono">
                {list.map((log) => (
                  <tr key={log.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="p-4 text-muted-foreground">{log.id}</td>
                    <td className="p-4 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                          log.type.startsWith("auth")
                            ? "bg-blue-500/10 text-blue-500"
                            : log.type.startsWith("crud")
                              ? "bg-purple-500/10 text-purple-500"
                              : "bg-secondary text-foreground"
                        )}
                      >
                        {log.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">{log.ip}</td>
                    <td className="p-4 font-sans text-foreground">{log.details}</td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold capitalize",
                          log.severity === "danger"
                            ? "bg-destructive/20 text-destructive"
                            : log.severity === "warning"
                              ? "bg-warning/20 text-warning-foreground"
                              : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-16 text-center text-sm text-muted-foreground font-sans">
              Belum ada log aktivitas yang tercatat.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// REUSABLE LOCAL IMAGE UPLOAD COMPONENT
// ============================================

function ImageUpload({
  value,
  onChange,
  label = "Gambar",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 2MB
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error("Ukuran file terlalu besar! Maksimal adalah 2MB.");
      return;
    }

    // WebP recommendation warning
    if (file.type !== "image/webp") {
      toast.info(
        "Saran: Gunakan format WebP untuk performa kompresi terbaik dan loading cepat."
      );
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      try {
        const res = await uploadImageFn({
          data: {
            base64Data,
            filename: file.name,
          },
        });
        onChange(res.url);
        toast.success("Gambar berhasil diunggah!");
      } catch (err: any) {
        toast.error(err.message || "Gagal mengunggah gambar");
      } finally {
        setUploading(false);
      }
    };
    reader.onerror = () => {
      toast.error("Gagal membaca file");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-foreground block">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... atau pilih file lokal"
          className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
        <label className="relative inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground cursor-pointer hover:bg-secondary/80 active:scale-95 transition-all">
          {uploading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          Pilih File
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
      <p className="text-[10px] text-muted-foreground leading-normal">
        Maksimal 2MB. <strong>Saran:</strong> Gunakan file berformat <strong>WebP</strong> untuk performa optimal.
      </p>
    </div>
  );
}

// ============================================
// HOMEPAGE CRUD EDITOR COMPONENT
// ============================================

function HomepageEditor({
  data,
  onChange,
  onSave,
  loading,
}: {
  data: any;
  onChange: (data: any) => void;
  onSave: (e: React.FormEvent) => void;
  loading: boolean;
}) {
  if (!data) {
    return (
      <div className="flex py-20 items-center justify-center bg-card rounded-3xl border border-border">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  const updateBilingual = (key: string, subkey: "id" | "en", value: string) => {
    onChange({
      ...data,
      [key]: {
        ...data[key],
        [subkey]: value,
      },
    });
  };

  const handleGroupItemsChange = (idx: number, val: string) => {
    const list = val.split(",").map((s) => s.trim()).filter(Boolean);
    const groups = [...data.skillGroups];
    groups[idx] = {
      ...groups[idx],
      items: list,
    };
    onChange({
      ...data,
      skillGroups: groups,
    });
  };

  const handleGroupTextChange = (idx: number, lang: "id" | "en", val: string) => {
    const groups = [...data.skillGroups];
    groups[idx] = {
      ...groups[idx],
      [lang === "id" ? "id" : "en"]: val,
    };
    onChange({
      ...data,
      skillGroups: groups,
    });
  };

  const handleGroupIconChange = (idx: number, iconName: string) => {
    const groups = [...data.skillGroups];
    groups[idx] = {
      ...groups[idx],
      iconName,
    };
    onChange({
      ...data,
      skillGroups: groups,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(e);
      }}
      className="space-y-6"
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h3 className="font-display text-lg font-bold text-foreground">
          Identitas & Informasi Hero Beranda
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Kelola nama, deskripsi, IPK, dan keahlian fokus yang muncul pada bagian atas beranda.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold text-foreground block">Nama Lengkap *</label>
            <input
              type="text"
              required
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>
          <div className="grid gap-2 grid-cols-2">
            <div>
              <label className="text-xs font-bold text-foreground block">IPK / GPA *</label>
              <input
                type="text"
                required
                value={data.gpa}
                onChange={(e) => onChange({ ...data, gpa: e.target.value })}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block">Fokus * (Contoh: Data · AI · Web)</label>
              <input
                type="text"
                required
                value={data.focus}
                onChange={(e) => onChange({ ...data, focus: e.target.value })}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        <FormRowBilingual
          label="Status Ketersediaan *"
          idVal={data.available.id}
          enVal={data.available.en}
          onChangeId={(v) => updateBilingual("available", "id", v)}
          onChangeEn={(v) => updateBilingual("available", "en", v)}
        />

        <FormRowBilingual
          label="Subtitle *"
          idVal={data.subtitle.id}
          enVal={data.subtitle.en}
          onChangeId={(v) => updateBilingual("subtitle", "id", v)}
          onChangeEn={(v) => updateBilingual("subtitle", "en", v)}
        />

        <FormRowBilingual
          label="Deskripsi Panjang *"
          idVal={data.description.id}
          enVal={data.description.en}
          onChangeId={(v) => updateBilingual("description", "id", v)}
          onChangeEn={(v) => updateBilingual("description", "en", v)}
          textarea
        />
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            Kelola Keahlian (Skills & Stack)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar kelompok keahlian dan bahasa pemrograman yang ditampilkan di bagian bawah beranda.
          </p>
        </div>

        <div className="space-y-6">
          {data.skillGroups.map((group: any, idx: number) => (
            <div key={idx} className="p-5 border border-border/80 rounded-2xl bg-secondary/10 space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-bold text-foreground block">Nama Kelompok (ID) *</label>
                  <input
                    type="text"
                    required
                    value={group.id}
                    onChange={(e) => handleGroupTextChange(idx, "id", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground block">Nama Kelompok (EN) *</label>
                  <input
                    type="text"
                    required
                    value={group.en}
                    onChange={(e) => handleGroupTextChange(idx, "en", e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground block">Icon *</label>
                  <select
                    value={group.iconName}
                    onChange={(e) => handleGroupIconChange(idx, e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                  >
                    <option value="Code2">Code2 (Programming)</option>
                    <option value="Database">Database (Big Data/ETL)</option>
                    <option value="Brain">Brain (AI/ML)</option>
                    <option value="Layout">Layout (Frontend/UI)</option>
                    <option value="Server">Server (Cloud/Infras)</option>
                    <option value="Wrench">Wrench (Tools)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block">Daftar Keahlian (Pisahkan dengan koma) *</label>
                <input
                  type="text"
                  required
                  value={group.items.join(", ")}
                  onChange={(e) => handleGroupItemsChange(idx, e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow transition-transform active:scale-95 hover:opacity-90 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Simpan Halaman Beranda
        </button>
      </div>
    </form>
  );
}

// ============================================
// INBOX MESSAGE VIEWER COMPONENT
// ============================================

function InboxViewer({
  list,
  onDelete,
  loading,
}: {
  list: any[];
  onDelete: (id: number) => void;
  loading: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <Mail className="h-5 w-5 text-accent" /> Pesan Masuk (Inbox)
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Membaca dan mengelola pesan dari pengunjung yang dikirim secara langsung melalui formulir kontak.
        </p>
      </div>

      {loading ? (
        <div className="flex py-20 items-center justify-center bg-card rounded-3xl border border-border">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : list.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {list.map((msg) => (
            <div
              key={msg.id}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm hover:border-accent/40 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold text-accent">
                      {msg.name}
                    </span>
                    <h4 className="font-display text-base font-bold text-foreground mt-1.5 leading-snug">
                      {msg.subject}
                    </h4>
                  </div>
                  <button
                    onClick={() => msg.id && onDelete(msg.id)}
                    className="rounded-xl p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
                    title="Hapus Pesan"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>

                <p className="text-xs text-foreground/80 bg-secondary/20 p-4 rounded-2xl whitespace-pre-wrap leading-relaxed font-sans border border-border/40">
                  {msg.message}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 pt-4 border-t border-border/40 mt-4 text-[10px] text-muted-foreground font-mono">
                <span>{new Date(msg.timestamp).toLocaleString()}</span>
                <span className="bg-secondary px-2 py-0.5 rounded-full">IP: {msg.ip}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-sm text-muted-foreground bg-card rounded-3xl border border-border">
          Belum ada pesan masuk.
        </div>
      )}
    </div>
  );
}



