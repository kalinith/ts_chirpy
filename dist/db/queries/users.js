import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { users } from "../schema/users.js";
import { config } from "../../config.js";
import { ForbiddenError } from "../../middleware/error.js";
import { FirstOrUndefined } from "./utils.js";
export async function createUser(user) {
    const [result] = await db
        .insert(users)
        .values(user)
        .onConflictDoNothing()
        .returning();
    return result;
}
export async function deleteUsers() {
    if (config.api.platform !== "dev") {
        throw new ForbiddenError("Cannot delete users in non-dev environment");
    }
    await db.delete(users);
}
;
export async function getUserById(userId) {
    const user = await db.select().from(users).where(eq(users.id, userId));
    return FirstOrUndefined(user);
}
