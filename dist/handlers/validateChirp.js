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
        res.status(400);
        res.send(JSON.stringify({ "error": "Something went wrong" }));
    }
    else if (chirp.body.length < 140) {
        const cleanChirp = wordCheck(chirp.body);
        res.status(200);
        res.send(JSON.stringify({ "cleanedBody": cleanChirp }));
    }
    else {
        throw new Error("Chirp body exceeds 140 characters");
    }
}
