import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Sparkles } from "lucide-react";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { contactItems, locationContact } from "@/data/contacts";
import { ContactCard } from "@/components/contact-card";
import { ContactForm } from "@/components/contact-form";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontak — Muhammad Luthfi Abdillah" },
      {
        name: "description",
        content:
          "Hubungi Muhammad Luthfi Abdillah lewat formulir pesan, WhatsApp, email, GitHub, LinkedIn, Kaggle, atau Instagram.",
      },
      { property: "og:title", content: "Kontak — Muhammad Luthfi Abdillah" },
      {
        property: "og:description",
        content: "Kirim pesan langsung atau terhubung melalui berbagai kanal.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { language } = useLanguage();
  const L = (id: string, en: string) => tr(id, en, language);

  const primary = contactItems.filter((c) => c.primary);
  const social = contactItems.filter((c) => !c.primary);
  const LocationIcon = locationContact.icon;

  return (
    <div className="relative">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden">
        <div className="absolute left-1/2 top-[-160px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-br from-accent-blue/15 via-accent-glow/10 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Hero */}
        <header className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            {L("Kontak", "Contact")}
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {L("Mari Terhubung", "Let's Connect")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">
            {L(
              "Terbuka untuk kolaborasi riset, proyek pengembangan, atau sekadar diskusi teknis. Kirim pesan lewat form atau pilih kanal favorit Anda.",
              "Open to research collaborations, dev projects, or technical chats. Send a message via the form or pick your preferred channel.",
            )}
          </p>
        </header>

        {/* Main split layout */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left — Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Right — Contact channels */}
          <aside className="lg:col-span-2 space-y-6">
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                {L("Kontak Langsung", "Direct Contact")}
              </h2>
              <div className="grid gap-3">
                {primary.map((c) => (
                  <ContactCard key={c.id} item={c} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {L("Media Sosial & Profil", "Social & Profiles")}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {social.map((c) => (
                  <ContactCard key={c.id} item={c} />
                ))}
              </div>
            </section>

            <section>
              <div
                className={cn(
                  "relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm",
                )}
              >
                <div
                  className={cn(
                    "absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-15 blur-2xl bg-gradient-to-br",
                    locationContact.gradient,
                  )}
                />
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                    locationContact.gradient,
                  )}
                >
                  <LocationIcon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {L(locationContact.labelId, locationContact.labelEn)}
                  </div>
                  <div className="mt-0.5 font-display text-base font-semibold text-foreground">
                    {locationContact.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {L(locationContact.countryId, locationContact.countryEn)}
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
