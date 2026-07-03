import { Request, Response, NextFunction } from "express";

export async function middlewareLogResponses(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.on("finish", () => {
        console.log(`[NON-OK] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
    });    
    next();
}