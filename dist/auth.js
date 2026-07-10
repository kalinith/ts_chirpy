import { verify, hash } from "argon2";
export async function hashPassword(password) {
    if (password) {
        return await hash(password);
    }
    throw new Error("Password is required");
}
export async function checkPasswordHash(password, hash) {
    if (password && hash) {
        return await verify(hash, password);
    }
    return false;
}
