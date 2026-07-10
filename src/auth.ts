import {verify, hash} from "argon2";

export async function hashPassword(password: string): Promise<string> {
    if (password) {
        return await hash(password);
    }
    throw new Error("Password is required");
}

export async function checkPasswordHash(password: string, hash: string): Promise<boolean> {
    if (password && hash) {
        return await verify(hash, password);
    }
    return false;
}