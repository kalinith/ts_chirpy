import express from "express";
import { handlerReadiness } from "./handlers/healthz.js";
import { middlewareLogResponses } from "./middleware/logresponse.js";
import { middlewareMetricsInc } from "./middleware/metrics.js";
import { handlerMetrics } from "./handlers/metrics.js";
import { HandlerRes } from "./handlers/reset.js";
const app = express();
const PORT = 8080;
// app
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
// api
app.get("/api/healthz", handlerReadiness);
// admin
app.get("/admin/metrics", handlerMetrics);
app.post("/admin/reset", HandlerRes);
// launch server
app.use(middlewareLogResponses);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
