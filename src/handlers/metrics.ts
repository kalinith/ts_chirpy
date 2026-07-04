import { Request, Response } from "express";
import { config } from "../config.js";

export async function handlerMetrics(req: Request, res: Response): Promise<void> {
    res.contentType("text/plain; charset=utf-8");
    res.send(`Hits: ${config.fileserverHits}`);
    res.status(200);
}