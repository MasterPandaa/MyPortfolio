import { useState } from "react";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { sendContactMessageFn } from "@/lib/admin-server";

const RECIPIENT = "luthfiabd.14@gmail.com";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(2000),
});

type FieldErrors = Partial<Record<"name" | "subject" | "message", string>>;

export function ContactForm() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);

  const L = (id: string, en: string) => tr(id, en, language);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, subject, message });
    if (!parsed.success) {
      const fe: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!fe[key]) {
          fe[key] =
            key === "name"
              ? L("Nama minimal 2 karakter", "Name must be at least 2 characters")
              : key === "subject"
                ? L("Subjek minimal 3 karakter", "Subject must be at least 3 characters")
                : L("Pesan minimal 10 karakter", "Message must be at least 10 characters");
        }
      }
      setErrors(fe);
      toast.error(L("Periksa kembali isian Anda", "Please review the form"));
      return;
    }
    setErrors({});
    setSending(true);

    try {
      await sendContactMessageFn({
        data: {
          name: parsed.data.name,
          subject: parsed.data.subject,
          message: parsed.data.message,
        },
      });

      toast.success(
        L("Pesan Anda berhasil dikirim!", "Your message was successfully sent!"),
        {
          description: L(
            "Terima kasih telah menghubungi saya. Pesan telah disimpan di sistem.",
            "Thank you for contacting me. The message has been stored in the system.",
          ),
        },
      );
      setName("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      toast.error(err.message || "Gagal mengirim pesan");
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
