import { BadRequestError } from "./error.js";
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
export async function handlerValidateChirp(req, res) {
    const chirp = req.body;
    res.header("Content-Type", "application/json");
    if (chirp.body === null) {
        throw new BadRequestError("Chirp is required");
    }
    else if (chirp.body.length > 140) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
    }
    else {
        const cleanChirp = wordCheck(chirp.body);
        res.status(200);
        res.send(JSON.stringify({ "cleanedBody": cleanChirp }));
    }
}
