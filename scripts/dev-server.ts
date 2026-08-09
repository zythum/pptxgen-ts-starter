/**
 * dev-server.ts — HTTP dev server for `npm run dev`.
 *
 * Serves static files (web/) and provides GET /api/generate which compiles
 * and returns a PPTX on-demand via tsImport (no module cache staleness).
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exec } from "node:child_process";
import arg from "arg";
import { generate } from "./generate-pptx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── MIME types ──
const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".woff": "font/woff",
  ".webp": "image/webp",
};

// ── CLI args ──
const args = arg(
  {
    "--port": Number,
    "--host": String,
    "--open": Boolean,
    "--help": Boolean,
    "-p": "--port",
    "-h": "--help",
  },
  { argv: process.argv.slice(2) },
);

if (args["--help"]) {
  console.log(`
  Usage: tsx scripts/dev-server.ts [options] <entry>

  Options:
    --port, -p   Port number (default: 5173 or $PORT; when no port is
                 specified and the default is already in use, the next
                 free port is chosen automatically)
    --host,      Host address (default: 127.0.0.1 or $HOST)
    --open       Open browser automatically on start
    --help, -h   Show this help message

  Arguments:
    <entry>      Path to the slide entry file (e.g. src/ppt.tsx)
`);
  process.exit(0);
}

const ENTRY_FILE = args._[0];
if (!ENTRY_FILE) {
  console.error("Usage: tsx scripts/dev-server.ts [options] <entry>");
  console.error("  Run with --help for details");
  process.exit(1);
}

// chdir to the entry file's directory so relative imports resolve correctly
const ENTRY_ABS = path.resolve(ROOT, ENTRY_FILE);
process.chdir(path.dirname(ENTRY_ABS));

// Port selection: a port counts as "specified" when given via --port or $PORT.
// Otherwise the default (5173) is used, and if it is already taken we step
// through subsequent ports until a free one is found.
const PORT_SPECIFIED = args["--port"] !== undefined || (process.env.PORT ?? "") !== "";
const INITIAL_PORT = args["--port"] ?? parseInt(process.env.PORT || "5173", 10);
const MAX_PORT_RETRIES = 20;
let PORT = INITIAL_PORT;
const HOST = args["--host"] ?? (process.env.HOST || "127.0.0.1");

// ── Hot-reload via SSE ──
const sseClients = new Set<http.ServerResponse>();
let changeTimer: ReturnType<typeof setTimeout> | null = null;

function broadcastReload() {
  // Debounce: coalesce rapid changes into one reload signal
  if (changeTimer) return;
  changeTimer = setTimeout(() => {
    changeTimer = null;
    for (const client of sseClients) {
      try {
        client.write("event: reload\ndata: {}\n\n");
      } catch {
        sseClients.delete(client);
      }
    }
    sseClients.clear();
  }, 50);
}

// Watch src/ directory for changes
const SRC_DIR = path.resolve(ROOT, "src");
if (fs.existsSync(SRC_DIR)) {
  fs.watch(SRC_DIR, { recursive: true }, (eventType, filename) => {
    if (filename && !filename.startsWith(".")) {
      broadcastReload();
    }
  });
}

// ── HTTP Server ──
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://" + HOST + ":" + PORT);
    let pathname = url.pathname;

    // ── API: Generate PPTX on-demand ──
    if (pathname === "/api/generate") {
      try {
        const buf = await generate({ outputType: "arraybuffer", root: ROOT, entry: ENTRY_FILE });
        if (!buf) {
          res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("Generate returned nothing");
          return;
        }
        const b = Buffer.from(buf);
        res.writeHead(200, {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "Content-Length": b.length.toString(),
          "Cache-Control": "no-cache, no-store, must-revalidate",
        });
        res.end(b);
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        console.log("✖ Generate failed");
        console.error(e);

        const body = JSON.stringify({
          error: e.message,
          file: ENTRY_FILE,
          stack: e.stack ?? null,
        });
        res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
        res.end(body);
      }
      return;
    }

    // ── SSE: Hot-reload ──
    if (pathname === "/api/hot-reload") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      });
      res.write("event: connected\ndata: {}\n\n");
      sseClients.add(res);
      req.on("close", () => sseClients.delete(res));
      return;
    }

    // ── Static files ──
    if (pathname === "/") pathname = "/index.html";

    const filePath = path.join(ROOT, "web", pathname);

    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": mime,
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600",
    });
    res.end(fs.readFileSync(filePath));
  } catch (err) {
    console.error("Server error:", err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal Server Error");
    }
  }
});

// ── Graceful shutdown ──
let closing = false;
const onClose = (signal: string) => {
  if (closing) return;
  closing = true;
  console.log(`\nReceived ${signal}, shutting down...`);

  // Try graceful close; force-exit after 3s if connections block it.
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 3000).unref();
};
process.on("SIGTERM", () => onClose("SIGTERM"));
process.on("SIGINT", () => onClose("SIGINT"));

// ── Start ──
const OPEN = args["--open"] ?? false;

function startServer(port: number) {
  // Drop any stale "listening" callback left over from a failed attempt — Node
  // keeps listen()'s callback registered on EADDRINUSE, so it would wrongly
  // fire (with the old port) once a retry succeeds.
  server.removeAllListeners("listening");
  server.once("listening", () => {
    const url = `http://${HOST}:${port}/`;
    console.log("  Dev Server");
    console.log(`  → ${url}\n`);

    if (OPEN) {
      if (process.platform === "win32") {
        // start "title" "url" — empty title prevents first-quoted-arg confusion
        exec(`start "" "${url}"`, { shell: "cmd.exe" }, (err) => {
          if (err) console.error(`  Failed to open browser: ${err.message}`);
        });
      } else {
        const cmd = process.platform === "darwin" ? "open" : "xdg-open";
        exec(`${cmd} "${url}"`, (err) => {
          if (err) console.error(`  Failed to open browser: ${err.message}`);
        });
      }
    }
  });
  server.listen(port, HOST);
}

// Handle listen-phase errors. An EADDRINUSE while not listening means the port
// is taken: fail fast if the user asked for a specific port, otherwise retry
// on the next port until a free one is found.
server.on("error", (err: NodeJS.ErrnoException) => {
  if (server.listening || err.code !== "EADDRINUSE") {
    console.error("Server error:", err);
    process.exit(1);
    return;
  }

  if (PORT_SPECIFIED) {
    console.error(`  ✖ Port ${PORT} is already in use.`);
    console.error("    Release it, or pick a free port with --port.");
    process.exit(1);
    return;
  }

  if (PORT - INITIAL_PORT >= MAX_PORT_RETRIES) {
    console.error(
      `  ✖ Port ${PORT} is in use and no free port was found after ${MAX_PORT_RETRIES} attempts.`,
    );
    process.exit(1);
    return;
  }

  console.log(`  Port ${PORT} is in use → trying ${PORT + 1}...`);
  PORT += 1;
  startServer(PORT);
});

startServer(PORT);
