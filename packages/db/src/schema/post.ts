import { sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  tittle: varchar("tittle", { length: 256 }),
  description: text("description"),
  likes: integer("likes").default(0),
  dislikes: integer("likes").default(0),
  createdAt: timestamp('timestamp4').default(sql`now()`),
  updatedAt: timestamp('timestamp4').default(sql`now()`)
})

