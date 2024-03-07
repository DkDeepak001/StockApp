import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(),
  userId: serial("userId").unique().notNull(),
  createdAt: timestamp('timestamp4').defaultNow()
})

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().notNull(),
  tittle: varchar("tittle", { length: 256 }).notNull(),
  authorId: text('authorId').references(() => users.id),
  description: text("description"),
  likes: integer("likes").default(0),
  dislikes: integer("likes").default(0),
  createdAt: timestamp('timestamp4').defaultNow(),
  updatedAt: timestamp('timestamp4').defaultNow()
})


export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  }),
  likedBy: many(likes)
}))


export const likes = pgTable("likedBy", {
  id: uuid("id").primaryKey().notNull(),
  likedBy: text("userId").references(() => users.userId),
  postId: text("postId").references(() => posts.id)
})

export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id]
  })
}))



