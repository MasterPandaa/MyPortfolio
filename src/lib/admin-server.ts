import { createServerFn } from "@tanstack/react-start";
import {
  checkIsAuthenticated,
  loginSession,
  logoutSession,
  getProjects,
  saveProjects,
  getExperiences,
  saveExperiences,
  getAiItems,
  saveAiItems,
  getAchievements,
  saveAchievements,
  getActivities,
  saveActivities,
  getSystemLogs,
  saveSystemLogs,
  logEvent,
  detectAnomalies,
  getHomepage,
  saveHomepage,
  uploadImage,
  type HomepageData,
  getContactMessages,
  insertContactMessage,
  deleteContactMessage,
  type ContactMessage,
} from "./data-service.server";
import type { Project } from "../data/projects";
import type { Experience } from "../data/experiences";
import type { AiItem } from "../data/ai-data";
import type { AchievementItem } from "../data/achievements";
import type { ActivityItem } from "../data/activities";

// Auth Actions
export const loginFn = createServerFn({ method: "POST" })
  .validator((pin: string) => pin)
  .handler(async ({ data: pin }) => {
    if (pin === "pklpkl123123") {
      loginSession();
      await logEvent("auth_success", "Login admin berhasil melalui panel", "info");
      return { success: true };
    }
    const masked = pin ? `${pin.slice(0, 3)}***` : "kosong";
    await logEvent("auth_failed", `Percobaan login gagal dengan PIN: ${masked}`, "warning");
    return { success: false, error: "PIN salah" };
  });

export const logoutFn = createServerFn({ method: "POST" })
  .handler(async () => {
    await logEvent("auth_success", "Admin keluar dari sesi", "info");
    logoutSession();
    return { success: true };
  });

export const checkAuthStatusFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return { authenticated: checkIsAuthenticated() };
  });

// Helper to throw unauthorized error
function verifyAuth() {
  if (!checkIsAuthenticated()) {
    throw new Error("Unauthorized: Harap login sebagai Admin.");
  }
}

// System Logs Actions
export const getSystemLogsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    verifyAuth();
    const logs = await getSystemLogs();
    const anomalies = detectAnomalies(logs);
    return { logs, anomalies };
  });

export const clearSystemLogsFn = createServerFn({ method: "POST" })
  .handler(async () => {
    verifyAuth();
    await saveSystemLogs([]);
    await logEvent("logs_clear", "Log sistem dibersihkan oleh admin", "warning");
    return { success: true };
  });

// Projects Server Functions
export const getProjectsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getProjects();
  });

export const upsertProjectFn = createServerFn({ method: "POST" })
  .validator((project: Project) => project)
  .handler(async ({ data: project }) => {
    verifyAuth();
    const list = await getProjects();
    const isEdit = !!project.id;
    if (project.id) {
      const idx = list.findIndex((p) => p.id === project.id);
      if (idx !== -1) {
        list[idx] = project;
      } else {
        list.push(project);
      }
    } else {
      const newId = list.length > 0 ? Math.max(...list.map((p) => p.id)) + 1 : 1;
      project.id = newId;
      list.push(project);
    }
    await saveProjects(list);
    await logEvent(
      "crud_create",
      `${isEdit ? "Mengubah" : "Membuat"} proyek "${project.title}" (ID: ${project.id})`,
      "info"
    );
    return { success: true };
  });

export const deleteProjectFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    verifyAuth();
    const list = await getProjects();
    const item = list.find((p) => p.id === id);
    const filtered = list.filter((p) => p.id !== id);
    await saveProjects(filtered);
    await logEvent("crud_delete", `Menghapus proyek "${item?.title || id}" (ID: ${id})`, "warning");
    return { success: true };
  });

// Experiences Server Functions
export const getExperiencesFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getExperiences();
  });

export const upsertExperienceFn = createServerFn({ method: "POST" })
  .validator((experience: Experience) => experience)
  .handler(async ({ data: experience }) => {
    verifyAuth();
    const list = await getExperiences();
    const isEdit = !!experience.id;
    if (experience.id) {
      const idx = list.findIndex((e) => e.id === experience.id);
      if (idx !== -1) {
        list[idx] = experience;
      } else {
        list.push(experience);
      }
    } else {
      const newId = list.length > 0 ? Math.max(...list.map((e) => e.id ?? 0)) + 1 : 1;
      experience.id = newId;
      list.push(experience);
    }
    await saveExperiences(list);
    await logEvent(
      "crud_create",
      `${isEdit ? "Mengubah" : "Membuat"} karir "${experience.company} - ${experience.role.id}" (ID: ${experience.id})`,
      "info"
    );
    return { success: true };
  });

export const deleteExperienceFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    verifyAuth();
    const list = await getExperiences();
    const item = list.find((e) => e.id === id);
    const filtered = list.filter((e) => e.id !== id);
    await saveExperiences(filtered);
    await logEvent("crud_delete", `Menghapus karir "${item?.company || id}" (ID: ${id})`, "warning");
    return { success: true };
  });

// AI Items Server Functions
export const getAiItemsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getAiItems();
  });

export const upsertAiItemFn = createServerFn({ method: "POST" })
  .validator((aiItem: AiItem) => aiItem)
  .handler(async ({ data: aiItem }) => {
    verifyAuth();
    const list = await getAiItems();
    const isEdit = !!aiItem.id;
    if (aiItem.id) {
      const idx = list.findIndex((a) => a.id === aiItem.id);
      if (idx !== -1) {
        list[idx] = aiItem;
      } else {
        list.push(aiItem);
      }
    } else {
      const newId = list.length > 0 ? Math.max(...list.map((a) => a.id)) + 1 : 1;
      aiItem.id = newId;
      list.push(aiItem);
    }
    await saveAiItems(list);
    await logEvent(
      "crud_create",
      `${isEdit ? "Mengubah" : "Membuat"} AI/Data "${aiItem.title}" (ID: ${aiItem.id})`,
      "info"
    );
    return { success: true };
  });

export const deleteAiItemFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    verifyAuth();
    const list = await getAiItems();
    const item = list.find((a) => a.id === id);
    const filtered = list.filter((a) => a.id !== id);
    await saveAiItems(filtered);
    await logEvent("crud_delete", `Menghapus AI/Data "${item?.title || id}" (ID: ${id})`, "warning");
    return { success: true };
  });

// Achievements Server Functions
export const getAchievementsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getAchievements();
  });

export const upsertAchievementFn = createServerFn({ method: "POST" })
  .validator((achievement: AchievementItem) => achievement)
  .handler(async ({ data: achievement }) => {
    verifyAuth();
    const list = await getAchievements();
    const isEdit = !!achievement.id;
    if (achievement.id) {
      const idx = list.findIndex((a) => a.id === achievement.id);
      if (idx !== -1) {
        list[idx] = achievement;
      } else {
        list.push(achievement);
      }
    } else {
      const newId = list.length > 0 ? Math.max(...list.map((a) => a.id)) + 1 : 1;
      achievement.id = newId;
      list.push(achievement);
    }
    await saveAchievements(list);
    await logEvent(
      "crud_create",
      `${isEdit ? "Mengubah" : "Membuat"} pencapaian "${achievement.title}" (ID: ${achievement.id})`,
      "info"
    );
    return { success: true };
  });

export const deleteAchievementFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    verifyAuth();
    const list = await getAchievements();
    const item = list.find((a) => a.id === id);
    const filtered = list.filter((a) => a.id !== id);
    await saveAchievements(filtered);
    await logEvent("crud_delete", `Menghapus pencapaian "${item?.title || id}" (ID: ${id})`, "warning");
    return { success: true };
  });

// Activities Server Functions
export const getActivitiesFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getActivities();
  });

export const upsertActivityFn = createServerFn({ method: "POST" })
  .validator((activity: ActivityItem) => activity)
  .handler(async ({ data: activity }) => {
    verifyAuth();
    const list = await getActivities();
    const isEdit = !!activity.id;
    if (activity.id) {
      const idx = list.findIndex((a) => a.id === activity.id);
      if (idx !== -1) {
        list[idx] = activity;
      } else {
        list.push(activity);
      }
    } else {
      const newId = list.length > 0 ? Math.max(...list.map((a) => a.id)) + 1 : 1;
      activity.id = newId;
      list.push(activity);
    }
    await saveActivities(list);
    await logEvent(
      "crud_create",
      `${isEdit ? "Mengubah" : "Membuat"} aktivitas (ID: ${activity.id} - ${activity.alt.id})`,
      "info"
    );
    return { success: true };
  });

export const deleteActivityFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    verifyAuth();
    const list = await getActivities();
    const item = list.find((a) => a.id === id);
    const filtered = list.filter((a) => a.id !== id);
    await saveActivities(filtered);
    await logEvent("crud_delete", `Menghapus aktivitas "${item?.alt.id || id}" (ID: ${id})`, "warning");
    return { success: true };
  });

// Homepage Server Functions
export const getHomepageFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getHomepage();
  });

export const updateHomepageFn = createServerFn({ method: "POST" })
  .validator((data: HomepageData) => data)
  .handler(async ({ data }) => {
    verifyAuth();
    await saveHomepage(data);
    await logEvent("crud_update", `Memperbarui data Beranda (Homepage)`, "info");
    return { success: true };
  });

// Image Upload Server Function
export const uploadImageFn = createServerFn({ method: "POST" })
  .validator((payload: { base64Data: string; filename: string }) => payload)
  .handler(async ({ data }) => {
    verifyAuth();
    const url = await uploadImage(data.base64Data, data.filename);
    await logEvent("crud_create", `Mengunggah file gambar: ${data.filename}`, "info");
    return { url };
  });

// Contact Messages Server Functions
export const sendContactMessageFn = createServerFn({ method: "POST" })
  .validator((payload: { name: string; subject: string; message: string }) => payload)
  .handler(async ({ data }) => {
    const ip = getRequestIP() || "127.0.0.1";
    await insertContactMessage({
      timestamp: new Date().toISOString(),
      name: data.name,
      subject: data.subject,
      message: data.message,
      ip,
    });
    await logEvent("crud_create", `Menerima pesan masuk dari "${data.name}"`, "info");
    return { success: true };
  });

export const getContactMessagesFn = createServerFn({ method: "GET" })
  .handler(async () => {
    verifyAuth();
    return await getContactMessages();
  });

export const deleteContactMessageFn = createServerFn({ method: "POST" })
  .validator((id: number) => id)
  .handler(async ({ data: id }) => {
    verifyAuth();
    await deleteContactMessage(id);
    await logEvent("crud_delete", `Menghapus pesan kontak (ID: ${id})`, "warning");
    return { success: true };
  });


