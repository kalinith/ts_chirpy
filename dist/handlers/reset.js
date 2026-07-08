import { config } from "../config.js";
import { deleteUsers } from "../db/queries/users.js";
export async function HandlerRes(req, res) {
    config.api.fileServerHits = 0;
    await deleteUsers();
    res.contentType("text/plain; charset=utf-8");
    res.status(200);
    res.send("Metrics reset");
}
