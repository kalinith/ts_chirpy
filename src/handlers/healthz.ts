import { Request, Response } from "express";


export async function handlerReadiness(req: Request, res: Response): Promise<void> {
    res.contentType("text/plain; charset=utf-8");
    res.send("OK");
    res.status(200);
}