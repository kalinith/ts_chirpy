import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/db/schema",
  out: "src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:postgres@localhost:5432/chirpy?sslmode=disable",
  },
});