import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

import tsconfigPath from "vite-tsconfig-paths"
import { defineProject } from "vitest/config"

import { astPlugin } from "../../plugins/vite/ast"

const pkg = JSON.parse(readFileSync("package.json", "utf8"))
const __dirname = fileURLToPath(new URL(".", import.meta.url))

export default defineProject({
  root: "./",
  test: {
    globals: true,
    setupFiles: [resolve(__dirname, "./setup-file.ts")],
    environment: "happy-dom",
    includeSource: [resolve(__dirname, ".")],
    dom: true,
  },

  define: {
    APP_VERSION: JSON.stringify(pkg.version),
    APP_NAME: JSON.stringify(pkg.name),
    APP_DEV_CWD: JSON.stringify(process.cwd()),

    GIT_COMMIT_SHA: "'SHA'",
    DEBUG: process.env.DEBUG === "true",
    ELECTRON: "false",
  },

  plugins: [
    astPlugin,
    tsconfigPath({
      projects: ["./tsconfig.json"],
    }),
  ],
})
