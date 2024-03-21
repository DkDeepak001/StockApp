import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, varchar, pgEnum, primaryKey, uniqueIndex } from "drizzle-orm/pg-core";

// Users schema
export const users = pgTable("users", {
  id: text("id"),
  userId: text("userId").unique().notNull().primaryKey(),
  userName: text('userName').notNull(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  imgUrl: text("imgUrl").notNull(),
  createdAt: timestamp('createdAt').defaultNow()
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  reactions: many(reactions),
  comments: many(comments),
  intrests: many(userToHashTag),
  follwers: many(following, {
    relationName: "follwers"
  }),
  following: many(following, {
    relationName: "following"
  })
}))


// Post schema
export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  tittle: varchar("tittle", { length: 256 }).notNull(),
  authorId: text('authorId').notNull(),
  description: text("description"),
  likes: integer("likes").default(0),
  dislikes: integer("dislikes").default(0),
  createdAt: timestamp('created_at').defaultNow(),
  // updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3)`),
})


export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.userId]
  }),
  reactions: many(reactions),
  comments: many(comments),
  tags: many(postToHashTag),
  files: many(files)
}))



// Reaction Schema
export const reactionsType = pgEnum('reactionsType', ["like", "dislikes"])

export const reactions = pgTable("reactions", ({
  id: text('id').primaryKey(),
  type: reactionsType("reactionsType"),
  postId: text("postId").notNull(),
  userId: text("userId").notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  // updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3)`),
}), (t) => ({
  unq: uniqueIndex().on(t.postId, t.userId),
}))



export const reactionsRelations = relations(reactions, ({ one }) => ({
  post: one(posts, {
    references: [posts.id],
    fields: [reactions.postId]
  }),
  user: one(users, {
    references: [users.userId],
    fields: [reactions.userId]
  })
}))


// COMMENTS Schema 

export const comments = pgTable("comments", {
  id: text("id").primaryKey(),
  comment: text("comment").notNull(),
  postId: text("postId").notNull(),
  userId: text("userId").notNull(),
  createdAt: timestamp('created_at').defaultNow(),

})

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    references: [posts.id],
    fields: [comments.postId]
  }),
  user: one(users, {
    references: [users.userId],
    fields: [comments.userId]
  })
}))



// Hashtag Schema
export const hashTag = pgTable("hashTag", {
  id: text("id").primaryKey().notNull(),
  name: text("name").unique().notNull()
})

export const hashTagRelation = relations(hashTag, ({ many }) => ({
  posts: many(postToHashTag),
  users: many(userToHashTag)
}))


//post to hashTag relation
export const postToHashTag = pgTable("postToHashTag", {
  postId: text("postId").references(() => posts.id),
  hashTagId: text('tagId').references(() => hashTag.id)
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


// Users Intrests Table 
export const userToHashTag = pgTable("userIntrests", {
  userId: text("userId").references(() => users.id),
  hashTagId: text('tagId').references(() => hashTag.id)
}, (t) => ({
  pk: primaryKey({ columns: [t.hashTagId, t.userId] })
}))

export const userToHashTagRelation = relations(userToHashTag, ({ one }) => ({
  user: one(users, {
    fields: [userToHashTag.userId],
    references: [users.id]
  }),
  handTag: one(hashTag, {
    references: [hashTag.id],
    fields: [userToHashTag.hashTagId]
  })
}))


export const files = pgTable("file", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull().unique(),
  path: text("filePath").notNull(),
  postId: text("postId"),
  height: integer("height").default(0),
  width: integer("weight").default(0),
  createdAt: timestamp('created_at').defaultNow(),
})

export const filesRelation = relations(files, ({ one }) => ({
  post: one(posts, {
    references: [posts.id],
    fields: [files.postId]
  })
}))



export const following = pgTable('following', {
  id: text('id').primaryKey(),
  followerId: text('id').notNull(),
  followingId: text('id').notNull()
}, (t) => ({
  unq: uniqueIndex().on(t.followerId, t.followingId)
}))


export const followingRelations = relations(following, ({ one }) => ({
  follwers: one(users, {
    fields: [following.followerId],
    references: [users.userId],
    relationName: "follwers"
  }),
  following: one(users, {
    fields: [following.followingId],
    references: [users.userId],
    relationName: "following"
  })
}))
