import { db } from "../index.js";
import { users } from "../schema/users.js";
import { config } from "../../config.js";
import { ForbiddenError } from "../../middleware/error.js";
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
