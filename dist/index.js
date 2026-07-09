import express from "express";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { handlerReadiness } from "./handlers/healthz.js";
import { handlerMetrics } from "./handlers/metrics.js";
import { HandlerRes } from "./handlers/reset.js";
import { handlerAddChirp, handlerGetChirps, handlerGetChirp } from "./handlers/Chirps.js";
import { handlerAddUser } from "./handlers/users.js";
import { middlewareLogResponses } from "./middleware/logresponse.js";
import { middlewareMetricsInc } from "./middleware/metrics.js";
import { errorMiddleware } from "./middleware/error.js";
import { config } from "./config.js";
const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);
const app = express();
app.use(express.json());
// app
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
// api
app.get("/api/healthz", (req, res, next) => {
    Promise.resolve(handlerReadiness(req, res)).catch(next);
});
app.post("/api/users", (req, res, next) => {
    Promise.resolve(handlerAddUser(req, res)).catch(next);
});
// api/chirps
app.post("/api/chirps", (req, res, next) => {
    Promise.resolve(handlerAddChirp(req, res)).catch(next);
});
app.get("/api/chirps", (req, res, next) => {
    Promise.resolve(handlerGetChirps(req, res)).catch(next);
});
app.get("/api/chirps/:chirpId", (req, res, next) => {
    Promise.resolve(handlerGetChirp(req, res)).catch(next);
});
// admin
app.get("/admin/metrics", (req, res, next) => {
    Promise.resolve(handlerMetrics(req, res)).catch(next);
});
app.post("/admin/reset", (req, res, next) => {
    Promise.resolve(HandlerRes(req, res)).catch(next);
});
// Error Handling
app.use(errorMiddleware);
// other middleware
app.use(middlewareLogResponses);
// launch server
app.listen(config.api.port, () => {
    console.log(`Server is running at http://localhost:${config.api.port}`);
});
