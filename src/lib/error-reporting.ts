/**
 * Melaporkan error dari React error boundary ke console.
 * Di production/platform lain, ini bisa diganti dengan integrasi Sentry, dsb.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  console.error("[ErrorBoundary]", error, context);
}
