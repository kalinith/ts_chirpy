import { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

export async function middlewareMetricsInc(req: Request, res: Response, next: NextFunction): Promise<void> {
  config.api.fileServerHits++;
  next();
}