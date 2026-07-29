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
import arg from "arg";
import { generate } from "./generate";

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
  ".webp": "image/webp",
};

// ── CLI args ──
const args = arg(
  {
    "--port": Number,
    "--host": String,
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
    --port, -p   Port number (default: 5173 or $PORT)
    --host,      Host address (default: 127.0.0.1 or $HOST)
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

const PORT = args["--port"] ?? parseInt(process.env.PORT || "5173", 10);
const HOST = args["--host"] ?? (process.env.HOST || "127.0.0.1");

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
        const e = err as Error;
        console.error("Generate error:", e.message);
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Generate failed: " + e.message);
      }
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
server.listen(PORT, HOST, () => {
  console.log("\n  Dev Server");
  console.log("  → http://" + HOST + ":" + PORT + "/\n");
});
