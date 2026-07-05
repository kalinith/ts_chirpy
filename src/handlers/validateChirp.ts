import { Request, Response } from "express";

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
        res.status(400);
        res.send(JSON.stringify({ "error": "Something went wrong" }));
    } else if (chirp.body.length < 140) {
        const cleanChirp = wordCheck(chirp.body)

        res.status(200);
        res.send(JSON.stringify({ "cleanedBody": cleanChirp }));
    } else {
        res.status(400);
        res.send(JSON.stringify({ "error": "Chirp is too long" }));
    }
}