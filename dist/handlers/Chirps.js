import { BadRequestError } from "../middleware/error.js";
import { getUserById } from "../db/queries/users.js";
import { createChirp, getChirps } from "../db/queries/chirps.js";
function wordCheck(chirp) {
    const profaneWords = ["kerfuffle", "sharbert", "fornax"];
    const words = chirp.split(" ");
    const cleanWords = [];
    for (const word of words) {
        if (profaneWords.includes(word.toLowerCase())) {
            cleanWords.push("****");
        }
        else {
            cleanWords.push(word);
        }
    }
    return cleanWords.join(" ");
}
export async function handlerAddChirp(req, res) {
    const chirp = req.body;
    res.header("Content-Type", "application/json");
    if (chirp.body === null || chirp.body === undefined || chirp.body.trim() === "") {
        throw new BadRequestError("Chirp is required");
    }
    else if (chirp.body.length > 140) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
    }
    else if (chirp.userId === null || chirp.userId === undefined || chirp.userId.trim() === "") {
        throw new BadRequestError("User ID is required");
    }
    else if (getUserById(chirp.userId) === undefined) {
        throw new BadRequestError("User not found");
    }
    else {
        const cleanChirp = wordCheck(chirp.body);
        const newChirp = {
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
export async function handlerGetChirps(req, res) {
    const chirps = await getChirps();
    res.contentType("application/json");
    res.status(200);
    res.json(chirps);
}
