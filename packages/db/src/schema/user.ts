import { sql } from "drizzle-orm";
import { pgTable, serial, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  userId: serial("userId").unique(),
  createdAt: timestamp('timestamp4').default(sql`now()`)
})



