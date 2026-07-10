import { createUser, getUserByEmail } from "../db/queries/users.js";
import { BadRequestError, UnauthorizedError } from "../middleware/error.js";
import { checkPasswordHash, hashPassword } from "../auth.js";
function sanitizeUser(user) {
    const response = {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
    };
    return response;
}
export async function handlerAddUser(req, res) {
    const user = req.body;
    console.log(`user object returned is ${user.email}, ${user.password}`);
    if (!user.email || !user.password) {
        throw new BadRequestError("Email and password are required");
    }
    const newUser = { email: user.email, hashedPassword: await hashPassword(user.password) };
    const result = await createUser(newUser);
    if (result === undefined) {
        throw new BadRequestError("User already exists");
    }
    res.status(201);
    res.type("application/json");
    res.send(JSON.stringify(sanitizeUser(result)));
}
export async function handlerLogin(req, res) {
    const userParams = req.body;
    if (!userParams.email || !userParams.password) {
        throw new BadRequestError("Email and password are required");
    }
    const user = await getUserByEmail(userParams.email);
    if (user === undefined || !await checkPasswordHash(userParams.password, user.hashedPassword)) {
        throw new UnauthorizedError("incorrect email or password");
    }
    res.status(200);
    res.type("application/json");
    res.send(JSON.stringify(sanitizeUser(user)));
}
