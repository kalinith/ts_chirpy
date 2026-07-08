import { createUser } from "../db/queries/users.js";
import { BadRequestError } from "../middleware/error.js";
export async function handlerAddUser(req, res) {
    const user = req.body;
    const newUser = { email: user.email };
    const result = await createUser(newUser);
    if (result === undefined) {
        throw new BadRequestError("User already exists");
    }
    res.status(201);
    res.type("application/json");
    res.send(JSON.stringify(result));
}
