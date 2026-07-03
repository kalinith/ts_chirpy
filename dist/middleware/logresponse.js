export async function middlewareLogResponses(req, res, next) {
    res.on("finish", () => {
        console.log(`[NON-OK] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
    });
    next();
}
