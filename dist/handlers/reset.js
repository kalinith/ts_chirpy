import { config } from "../config.js";
export async function HandlerRes(req, res) {
    config.fileserverHits = 0;
    res.contentType("text/plain; charset=utf-8");
    res.status(200);
    res.send("Metrics reset");
}
