import { Request, Response } from "express";
import { BadRequestError } from "../middleware/error.js";
import { getUserById } from "../db/queries/users.js";
import { NewChirp } from "../db/schema/chirps.js";
import { createChirp } from "../db/queries/chirps.js";

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

export async function handlerAddChirp(req: Request, res: Response): Promise<void> {
    type Chirp = {
        body: string;
        userId: string;
    };
    
    const chirp: Chirp = req.body;
    res.header("Content-Type", "application/json");
    if (chirp.body === null || chirp.body === undefined || chirp.body.trim() === "") {
        throw new BadRequestError("Chirp is required");
    } else if (chirp.body.length > 140) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
    } else if (chirp.userId === null || chirp.userId === undefined || chirp.userId.trim() === "") {
        throw new BadRequestError("User ID is required");
    } else if (getUserById(chirp.userId) === undefined) {
        throw new BadRequestError("User not found");
    } else {
        const cleanChirp = wordCheck(chirp.body);
        const newChirp: NewChirp = {
            body: cleanChirp,
            userId: chirp.userId,
        };
        const result = await createChirp(newChirp);
        if (result === undefined) {
            throw new BadRequestError("Failed to create chirp");
        }
        res.contentType("application/json");
        res.status(201);
        res.send(JSON.stringify(result));
    }
}

