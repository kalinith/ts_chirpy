import { pgTable, timestamp, varchar, uuid } from "drizzle-orm/pg-core";
import { users } from "./index.js";
export const chirps = pgTable("chirps", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    body: varchar("body", { length: 140 }).notNull(),
    userId: uuid("user_id").notNull()
        .references(() => users.id, { onDelete: "cascade" }),
});
