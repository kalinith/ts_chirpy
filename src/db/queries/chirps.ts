import { db } from "../index.js";
import { NewChirp, chirps } from "../schema/chirps.js";
import { eq } from "drizzle-orm"


export async function createChirp(chirp: NewChirp) {
  const [result] = await db
    .insert(chirps)
    .values(chirp)
    .returning();
  return result;
}

export async function deleteChirp(chirpId: string) {
    await db.delete(chirps).where(eq(chirps.id, chirpId));
}