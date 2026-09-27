import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const port = Number(process.env.PORT ?? 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".woff2": "font/woff2",
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const candidates = [];

  if (clean.endsWith("/")) {
    candidates.push(path.join(root, clean, "index.html"));
  } else {
    candidates.push(path.join(root, clean));
    candidates.push(path.join(root, clean, "index.html"));
    candidates.push(path.join(root, `${clean}.html`));
  }

  for (const file of candidates) {
    if (!file.startsWith(root)) continue;
    try {
      const info = await stat(file);
      if (info.isFile()) return file;
    } catch {
      /* ignoré */
    }
  }
  return null;
}

createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");
  if (!file) {
    try {
      const notFound = await readFile(path.join(root, "404.html"));
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      res.end(notFound);
    } catch {
      res.writeHead(404).end("404");
    }
    return;
  }

  try {
    const body = await readFile(file);
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { "content-type": types[ext] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500).end("500");
  }
}).listen(port, () => {
  console.log(`Site statique (out/) : http://localhost:${port}`);
});
