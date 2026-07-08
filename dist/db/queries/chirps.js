import { db } from "../index.js";
import { chirps } from "../schema/chirps.js";
import { eq } from "drizzle-orm";
export async function createChirp(chirp) {
    const [result] = await db
        .insert(chirps)
        .values(chirp)
        .returning();
    return result;
}
export async function deleteChirp(chirpId) {
    await db.delete(chirps).where(eq(chirps.id, chirpId));
}
