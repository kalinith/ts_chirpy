import { Request, Response } from "express";
import { BadRequestError } from "./error.js";

type Profane = "kerfuffle" | "sharbert" | "fornax";

function wordCheck(chirp: string): string {
    const profaneWords: Profane[] = ["kerfuffle", "sharbert", "fornax"];
    const words = chirp.split(" ");
    const cleanWords: string[] = [];
    for (const word of words) {
        if (profaneWords.includes(word.toLowerCase() as Profane)) {
            cleanWords.push("****");
        } else {
            cleanWords.push(word);
        }
    }
    return cleanWords.join(" ");
}

export async function handlerValidateChirp(req: Request, res: Response): Promise<void> {
    type Chirp = {
        body: string;
    };    
    
    const chirp: Chirp = req.body;
    res.header("Content-Type", "application/json");
    if (chirp.body === null) {
        throw new BadRequestError("Chirp is required");
    } else if (chirp.body.length > 140) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
    } else {
        const cleanChirp = wordCheck(chirp.body);
        res.status(200);
        res.send(JSON.stringify({ "cleanedBody": cleanChirp }));
    }
}