import { useState } from "react";
import { z } from "zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

const RECIPIENT = "luthfiabd.14@gmail.com";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(2000),
});

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function ContactForm() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);

  const L = (id: string, en: string) => tr(id, en, language);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email, subject, message });
    if (!parsed.success) {
      const fe: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!fe[key]) {
          fe[key] =
            key === "name"
              ? L("Nama minimal 2 karakter", "Name must be at least 2 characters")
              : key === "email"
                ? L("Format email tidak valid", "Invalid email address")
                : key === "subject"
                  ? L("Subjek minimal 3 karakter", "Subject must be at least 3 characters")
                  : L("Pesan minimal 10 karakter", "Message must be at least 10 characters");
        }
      }
      setErrors(fe);
      toast.error(L("Periksa kembali isian Anda", "Please review the form fields"));
      return;
    }

    setErrors({});
    setSending(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          _subject: `[PENTING] ${parsed.data.subject}`,
          _priority: "high",
          _template: "table",
          _captcha: "false",
          message: parsed.data.message,
        }),
      });

      const resData = await response.json().catch(() => ({}));

      if (response.ok && (resData.success === "true" || resData.success === true || response.status === 200)) {
        toast.success(L("Pesan Berhasil Dikirim!", "Message Sent Successfully!"), {
          description: L(
            "Pesan telah terkirim langsung ke email luthfiabd.14@gmail.com dengan kategori PENTING.",
            "Message sent directly to luthfiabd.14@gmail.com marked as IMPORTANT.",
          ),
          icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error(resData.message || L("Gagal mengirim pesan via server", "Failed to send message via server"));
      }
    } catch (err: any) {
      // Fallback: Open mailto client if fetch encounters network error or blocker
      try {
        const mailtoSubject = encodeURIComponent(`[PENTING] ${parsed.data.subject}`);
        const mailtoBody = encodeURIComponent(
          `Nama: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}`
        );
        window.open(`mailto:${RECIPIENT}?subject=${mailtoSubject}&body=${mailtoBody}`, "_blank");

        toast.info(L("Membuka aplikasi email...", "Opening email app..."), {
          description: L(
            "Pesan Anda telah disiapkan dengan kategori [PENTING]. Tekan kirim di aplikasi email Anda.",
            "Your message is ready with [PENTING] category. Click send in your email client.",
          ),
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } catch {
        toast.error(err.message || L("Gagal mengirim pesan", "Failed to send message"));
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:p-8 shadow-sm"
    >
      {/* decorative glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-glow/10 blur-3xl" />

      <div className="relative">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {L("Kirim Pesan", "Send a Message")}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {L(
            "Isi formulir di bawah — pesan akan langsung dikirim ke email saya.",
            "Fill the form below — it goes straight to my inbox.",
          )}
        </p>

        <div className="mt-6 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="cf-name">{L("Nama", "Name")}</Label>
              <Input
                id="cf-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={L("Nama lengkap Anda", "Your full name")}
                maxLength={100}
                className={cn(errors.name && "border-destructive focus-visible:ring-destructive/30")}
                autoComplete="name"
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cf-email">{L("Email Anda", "Your Email")}</Label>
              <Input
                id="cf-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={L("nama@email.com", "name@email.com")}
                maxLength={100}
                className={cn(errors.email && "border-destructive focus-visible:ring-destructive/30")}
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cf-subject">{L("Subjek", "Subject")}</Label>
            <Input
              id="cf-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={L("Contoh: Kolaborasi proyek riset", "e.g. Research collaboration")}
              maxLength={150}
              className={cn(errors.subject && "border-destructive focus-visible:ring-destructive/30")}
            />
            {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cf-message">{L("Pesan", "Message")}</Label>
            <Textarea
              id="cf-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={L(
                "Tuliskan pesan Anda di sini…",
                "Write your message here…",
              )}
              rows={6}
              maxLength={2000}
              className={cn(
                "resize-none",
                errors.message && "border-destructive focus-visible:ring-destructive/30",
              )}
            />
            <div className="flex items-center justify-between">
              {errors.message ? (
                <p className="text-xs text-destructive">{errors.message}</p>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {L("Minimal 10 karakter", "Minimum 10 characters")}
                </span>
              )}
              <span className="text-xs text-muted-foreground">{message.length}/2000</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={sending}
            size="lg"
            className="group mt-2 h-12 w-full gap-2 bg-gradient-to-r from-navy to-accent-blue text-white hover:from-navy-deep hover:to-navy shadow-md sm:w-auto sm:self-start sm:px-8"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {L("Mengirim pesan…", "Sending message…")}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                {L("Kirim Pesan", "Send Message")}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

