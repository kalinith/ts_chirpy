import { Request, Response } from "express";

type ChirpData = {
    body: string | null;
    error: string | null;
    statusCode: number | null;
    valid: boolean;
};

export async function handlerValidateChirp(req: Request, res: Response): Promise<void> {
    let body = ""; // 1. Initialize
    const chirpData: ChirpData = {"body": null, "error": null, "statusCode": null, "valid": false};

    // 2. Listen for data events
    req.on("data", (chunk) => {
        body += chunk;
    });

    // 3. Listen for end events
    req.on("end", () => {
        try {
            const parsedBody = JSON.parse(body);
            // now you can use `parsedBody` as a JavaScript object
            if (typeof parsedBody.body === "string") {
                if (parsedBody.body.length <= 140) {
                    chirpData.body = parsedBody.body;
                    chirpData.valid = true;
                    chirpData.statusCode = 200;
                } else {
                    chirpData.error = "Chirp is too long";
                    chirpData.statusCode = 400;
                    chirpData.valid = false;
                }
            } else {
                chirpData.error = "Something went wrong";
                chirpData.statusCode = 400;
                chirpData.valid = false;
            }
        } catch (error) {
            chirpData.error = "Something went wrong";
            chirpData.statusCode = 400;
            chirpData.valid = false;
        } finally {
            let body = ""; // 1. Initialize
            res.status(chirpData.statusCode || 500)
            res.header("Content-Type", "application/json");
            if (chirpData.error === null) {
                body = JSON.stringify({valid: chirpData.valid,});
            } else {
                body = JSON.stringify({error: chirpData.error,});
            }
            res.send(body);
        }
    });
}