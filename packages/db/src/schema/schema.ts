import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  createdAt: timestamp('createdAt').defaultNow()
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  reactions: many(reactions)
}))


export const posts = pgTable("posts", {
  id: uuid("id").primaryKey(),
  tittle: varchar("tittle", { length: 256 }).notNull(),
  authorId: text('authorId').notNull(),
  description: text("description"),
  likes: integer("likes").default(0),
  dislikes: integer("likes").default(0),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow()
})


export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  }),
  reactions: many(reactions)
}))


export const reactions = pgTable("reactions", ({
  id: uuid('id').primaryKey(),
  postId: text("postId").notNull(),
  userId: text("postId").notNull()
}))

export const reactionsRelations = relations(reactions, ({ one }) => ({
  post: one(posts, {
    references: [posts.id],
    fields: [reactions.postId]
  }),
  user: one(users, {
    references: [users.id],
    fields: [reactions.userId]
  })
}))


