import { sql } from 'drizzle-orm'
import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid, varchar, pgEnum, primaryKey } from "drizzle-orm/pg-core";

// Users schema
export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  userId: text("userId").unique().notNull(),
  createdAt: timestamp('createdAt').defaultNow()
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  reactions: many(reactions)
}))


// Post schema
export const posts = pgTable("posts", {
  id: uuid("id").primaryKey(),
  tittle: varchar("tittle", { length: 256 }).notNull(),
  authorId: text('authorId').notNull(),
  description: text("description"),
  likes: integer("likes").default(0),
  dislikes: integer("likes").default(0),
  createdAt: timestamp('created_at').defaultNow(),
  // updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3)`),
})


export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  }),
  reactions: many(reactions),
  tags: many(postToHashTag)
}))



// Reaction Schema
export const reactionsType = pgEnum('reactionsType', ["like", "dislikes"])

export const reactions = pgTable("reactions", ({
  id: uuid('id').primaryKey(),
  type: reactionsType("reactionsType"),
  postId: text("postId").notNull(),
  userId: text("postId").notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  // updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3)`),
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


// Hashtag Schema
export const hashTag = pgTable("hashTag", {
  id: uuid("id").primaryKey().notNull(),
  name: text("name").unique()
})

export const hashTagRelation = relations(hashTag, ({ many }) => ({
  posts: many(postToHashTag)
}))


export const postToHashTag = pgTable("postToHashTag", {
  postId: uuid("postId").references(() => posts.id),
  hashTagId: uuid('tagId').references(() => hashTag.id)
}, (t) => ({
  pk: primaryKey({ columns: [t.hashTagId, t.postId] })
}))


export const postToHashTagRelation = relations(postToHashTag, ({ one }) => ({
  post: one(posts, {
    fields: [postToHashTag.postId],
    references: [posts.id]
  }),
  handTag: one(hashTag, {
    references: [hashTag.id],
    fields: [postToHashTag.hashTagId]
  })
}))







