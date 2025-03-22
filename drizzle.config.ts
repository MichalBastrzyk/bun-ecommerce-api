import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
})
