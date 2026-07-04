export async function handlerReadiness(req, res) {
    res.contentType("text/plain; charset=utf-8");
    res.send("OK");
    res.status(200);
}
