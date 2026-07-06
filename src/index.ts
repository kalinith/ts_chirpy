import express from "express";
import { handlerReadiness } from "./handlers/healthz.js";
import { middlewareLogResponses } from "./middleware/logresponse.js";
import { middlewareMetricsInc } from "./middleware/metrics.js";
import { handlerMetrics } from "./handlers/metrics.js";
import { HandlerRes } from "./handlers/reset.js";
import { handlerValidateChirp } from "./handlers/validateChirp.js";
import { errorMiddleware } from "./handlers/error.js";

const app = express();
const PORT = 8080;
// declare middleware for use in the app
app.use(middlewareLogResponses);
app.use(express.json());

// app
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

// api
app.get("/api/healthz", handlerReadiness);
app.post("/api/validate_chirp", handlerValidateChirp);

// admin
app.get("/admin/metrics", handlerMetrics);
app.post("/admin/reset", HandlerRes);

// Error Handling
app.use(errorMiddleware);

// launch server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});