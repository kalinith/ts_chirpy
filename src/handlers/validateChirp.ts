import { Request, Response } from "express";

export async function handlerValidateChirp(req: Request, res: Response): Promise<void> {
    type Chirp = {
        body: string;
    };    
    
    const chirp: Chirp = req.body;
    res.header("Content-Type", "application/json");
    if (chirp.body === null) {
        res.status(400);
        res.send(JSON.stringify({ "error": "omething went wrong" }));
    } else if (chirp.body.length < 140) {
        res.status(200);
        res.send(JSON.stringify({ "valid": true }));
    } else {
        res.status(400);
        res.send(JSON.stringify({ "error": "Chirp is too long" }));
    }
}