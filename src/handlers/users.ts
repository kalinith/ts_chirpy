import { Request, Response } from "express";

import { createUser, getUserByEmail } from "../db/queries/users.js";
import { NewUser, FetchUser } from "../db/schema/users.js";
import { BadRequestError, UnauthorizedError } from "../middleware/error.js";
import { checkPasswordHash, hashPassword } from "../auth.js";

type UserResponse = Omit<FetchUser, "hashedPassword">;

function sanitizeUser(user: FetchUser): UserResponse {
    const response: UserResponse = {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
    }
    return response;
}

export async function handlerAddUser(req: Request, res: Response): Promise<void> {
    type User = {
        email: string;
        password: string;
    }
    const user: User = req.body;
    console.log(`user object returned is ${user.email}, ${user.password}`);
    if (!user.email || !user.password) {
        throw new BadRequestError("Email and password are required");
    }
    const newUser: NewUser = {email: user.email, hashedPassword: await hashPassword(user.password)};
    const result = await createUser(newUser);
    if (result === undefined) {
        throw new BadRequestError("User already exists");
    }
    
    res.status(201);
    res.type("application/json");
    res.send(JSON.stringify(sanitizeUser(result)));
}

export async function handlerLogin(req: Request, res: Response): Promise<void> {
    type UserParams = {
        email: string;
        password: string;
    }
    const userParams: UserParams = req.body;
    if (!userParams.email || !userParams.password) {
        throw new BadRequestError("Email and password are required");
    }
    const user: FetchUser | undefined = await getUserByEmail(userParams.email);
    if (user === undefined || !await checkPasswordHash(userParams.password, user.hashedPassword)) {
        throw new UnauthorizedError("incorrect email or password");
    }
    res.status(200);
    res.type("application/json");
    res.send(JSON.stringify(sanitizeUser(user)));
}