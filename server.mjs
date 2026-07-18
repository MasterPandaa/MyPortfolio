import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import handler from './dist/server/server.js';
import path from 'path';

const app = new Hono();

// Serve static client assets (CSS, JS, images, etc.)
app.use('/assets/*', serveStatic({ root: './dist/client' }));

// Forward all other requests to TanStack Start's SSR handler
app.all('*', (c) => handler.fetch(c.req.raw));

const port = process.env.PORT || 8080;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Node server listening on http://localhost:${info.port}`);
});
