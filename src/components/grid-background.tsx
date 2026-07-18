export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-background">
      <style dangerouslySetInnerHTML={{ __html: `
        .grid-lines {
          position: absolute;
          inset: -30%;
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, color-mix(in oklab, var(--border) 50%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklab, var(--border) 50%, transparent) 1px, transparent 1px);
          transform: rotate(6deg);
          transform-origin: center;
        }
        .dark .grid-lines {
          background-image: 
            linear-gradient(to right, color-mix(in oklab, var(--foreground) 9%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 9%, transparent) 1px, transparent 1px);
        }
        .grid-mask {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 50% 50%, transparent 35%, var(--background) 85%);
        }
      `}} />
      <div className="grid-lines" />
      <div className="grid-mask" />
      
      {/* Noise Texture Overlay for subtle paper grain feel */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.01] dark:opacity-[0.02] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      />
    </div>
  );
}
