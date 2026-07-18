import { Copy, ExternalLink, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ContactItem } from "@/data/contacts";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

interface Props {
  item: ContactItem;
}

export function ContactCard({ item }: Props) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const Icon = item.icon;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const value = item.copyValue ?? item.handle;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(tr("Disalin ke clipboard", "Copied to clipboard", language), {
        description: value,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(tr("Gagal menyalin", "Failed to copy", language));
    }
  };

  // Horizontal layout for primary items (WhatsApp, Email)
  if (item.primary) {
    return (
      <a
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className={cn(
          "group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card p-4 md:p-6 shadow-sm",
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md",
        )}
      >
        <div
          className={cn(
            "absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-15 blur-2xl bg-gradient-to-br",
            item.gradient,
          )}
        />
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
            item.gradient,
            "h-14 w-14",
          )}
        >
          <Icon className="h-7 w-7" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {item.label}
          </div>
          <div className="mt-0.5 break-words font-display font-semibold text-foreground group-hover:text-accent transition-colors text-base md:text-lg">
            {item.handle}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {item.copyable && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={tr("Salin", "Copy", language)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground transition hover:border-accent hover:text-accent"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          )}
          {item.external && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition group-hover:text-accent">
              <ExternalLink className="h-4 w-4" />
            </div>
          )}
        </div>
      </a>
    );
  }

  // Vertical layout for secondary/social items (GitHub, LinkedIn, Kaggle, Instagram)
  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative flex flex-col items-center justify-center text-center overflow-hidden rounded-2xl border border-border/60 bg-card p-4 shadow-sm",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md h-full min-h-[140px]",
      )}
    >
      <div
        className={cn(
          "absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-10 blur-xl bg-gradient-to-br",
          item.gradient,
        )}
      />

      {item.external && (
        <div className="absolute top-3 right-3 text-muted-foreground opacity-60 transition-all duration-300 group-hover:text-accent group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ExternalLink className="h-3.5 w-3.5" />
        </div>
      )}

      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm mb-3",
          item.gradient,
        )}
      >
        <Icon className="h-5.5 w-5.5" />
      </div>

      <div className="w-full flex flex-col items-center px-1">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {item.label}
        </div>
        <div
          className={cn(
            "mt-1.5 break-words font-display font-semibold text-foreground group-hover:text-accent transition-colors text-xs sm:text-sm",
          )}
        >
          {item.handle}
        </div>
      </div>
    </a>
  );
}
