import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // Override + extend default ignores
  globalIgnores([
    // Next.js / build
    ".next/**",
    "out/**",
    "build/**",
    ".vercel/**",
    "next-env.d.ts",

    // Dependencies
    "node_modules/**",

    // Generated media / temp
    "public/sounds/generated/**",
    "public/sounds/tmp/**",
    "public/audio/tmp/**",
    "public/audio/cache/**",

    // Exports / artifacts
    "exports/**",
    "downloads/**",

    // Tooling
    ".turbo/**",
    ".cache/**",
    "*.tsbuildinfo",
  ]),
]);
