import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import handler from "./dist/server/server.js";

const port = parseInt(process.env.PORT || "8080", 10);

const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
  ".webmanifest": "application/manifest+json",
};

// Order of directories to search for static files
const STATIC_DIRS = ["./dist/client", "./public"];

async function tryServeStatic(pathname, res) {
  for (const dir of STATIC_DIRS) {
    const filePath = join(dir, pathname);
    try {
      const s = await stat(filePath);
      if (s.isFile()) {
        const ext = extname(filePath).toLowerCase();
        const mime = MIME[ext] || "application/octet-stream";
        const content = await readFile(filePath);
        res.writeHead(200, { "Content-Type": mime });
        res.end(content);
        return true;
      }
    } catch (_) {
      // Not found in this dir, try next
    }
  }
  return false;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost`);
  const pathname = url.pathname;

  // Try to serve static files first (from dist/client and public/)
  const served = await tryServeStatic(pathname, res);
  if (served) return;

  // Forward to TanStack Start SSR handler
  const request = new Request(`http://localhost${req.url}`, {
    method: req.method,
    headers: Object.fromEntries(
      Object.entries(req.headers)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, Array.isArray(v) ? v.join(", ") : v])
    ),
    body: ["GET", "HEAD"].includes(req.method)
      ? undefined
      : await new Promise((resolve) => {
          const chunks = [];
          req.on("data", (chunk) => chunks.push(chunk));
          req.on("end", () => resolve(Buffer.concat(chunks)));
        }),
  });

  const response = await handler.fetch(request);

  res.writeHead(response.status, Object.fromEntries(response.headers));
  const body = await response.arrayBuffer();
  res.end(Buffer.from(body));
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
