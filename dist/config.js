process.loadEnvFile();
function envOrThrow(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}
const migrationConfig = {
    migrationsFolder: "./src/db/migrations",
};
export const config = {
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
