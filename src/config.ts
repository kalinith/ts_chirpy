import type { MigrationConfig } from "drizzle-orm/migrator";

type DBConfig = {
  url: string;
  migrationConfig: MigrationConfig;
};

type APIConfig = {
  fileServerHits: number;
  port: number;
  platform: string;
};

type Config = {
  api: APIConfig;
  db: DBConfig;
};

process.loadEnvFile()

function envOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};


export const config: Config = {
  api: {
    fileServerHits: 0,
    port: parseInt(envOrThrow("API_PORT"), 10),
    platform: envOrThrow("PLATFORM")
  },
  db: {
    url: envOrThrow("DB_URL"),
    migrationConfig: migrationConfig,
  },
};
