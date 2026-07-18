import type { ActivityItem } from "@/data/activities";
import { useLanguage, t as tr } from "@/contexts/language-context";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  item: ActivityItem | null;
  onClose: () => void;
}

export function ActivityLightbox({ item, onClose }: Props) {
  const { language } = useLanguage();
  const open = !!item;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none [&>button]:bg-white/90 [&>button]:text-foreground [&>button]:rounded-full [&>button]:h-9 [&>button]:w-9 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:shadow-md [&>button]:opacity-100">
        {item && (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full">
              <img
                src={item.image}
                alt={tr(item.alt.id, item.alt.en, language)}
                className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2 rounded-full bg-card/90 px-4 py-2 shadow-md backdrop-blur">
              {item.keywords.map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-xs font-semibold text-foreground"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
