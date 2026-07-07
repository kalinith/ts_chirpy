process.loadEnvFile();
export const config = {
    fileserverHits: 0,
    dbURL: envOrThrow("DB_URL"),
};
function envOrThrow(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}
