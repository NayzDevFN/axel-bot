import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Déploiement GitHub Pages (site de projet : https://<user>.github.io/<repo>/)
 * Avant le build :  NEXT_PUBLIC_BASE_PATH=/<nom-du-depot>
 * En local, la variable est absente => basePath vide.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
