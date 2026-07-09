import { db } from "../index.js";
import { eq, asc } from "drizzle-orm";
import { chirps } from "../schema/chirps.js";
import { FirstOrUndefined } from "./utils.js";
export async function createChirp(chirp) {
    const [result] = await db
        .insert(chirps)
        .values(chirp)
        .returning();
    return result;
}
export async function getChirps() {
    const result = await db.select().from(chirps).orderBy(asc(chirps.createdAt));
    return result;
}
export async function getChirpbyID(chirpId) {
    const result = await db.select().from(chirps).where(eq(chirps.id, chirpId));
    return FirstOrUndefined(result);
}
export async function deleteChirp(chirpId) {
    await db.delete(chirps).where(eq(chirps.id, chirpId));
}
