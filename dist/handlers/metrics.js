import { config } from "../config.js";
export async function handlerMetrics(req, res) {
    res.contentType("text/plain; charset=utf-8");
    res.send(`Hits: ${config.fileserverHits}`);
    res.status(200);
}
