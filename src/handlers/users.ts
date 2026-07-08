import { Request, Response } from "express";

import { createUser } from "../db/queries/users.js";
import { NewUser } from "../db/schema/users.js";
import { BadRequestError } from "../middleware/error.js";

export async function handlerAddUser(req: Request, res: Response): Promise<void> {
    type User = {
        email: string;
    }

    const user: User = req.body;
    const newUser: NewUser = {email: user.email};
    const result = await createUser(newUser);
    if (result === undefined) {
        throw new BadRequestError("User already exists");
    }
    res.status(201);
    res.type("application/json");
    res.send(JSON.stringify(result));
}

