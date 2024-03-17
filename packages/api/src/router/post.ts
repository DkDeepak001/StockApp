import { schema } from "@stockHub/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { CreatePostApi, ReactPostApiInput } from "@stockHub/validators";
import { v4 as uuidv4 } from 'uuid';
import { clerkClient } from '@clerk/nextjs';
import { User } from "@clerk/nextjs/dist/types/server";
import moment from "moment";
import { eq, and, sql } from 'drizzle-orm'
import { z } from "zod";
import { sendHashTag } from "../utils/kafka";

type InsertFiles = typeof schema.files.$inferInsert

export const postRouter = createTRPCRouter({
  add: protectedProcedure.input(CreatePostApi).mutation(async ({ input, ctx }) => {
    try {
      const post = await ctx.db.insert(schema.posts).values({
        id: uuidv4(),
        tittle: input.title,
        description: input.content,
        authorId: ctx.auth.userId!,
      }).returning({ postId: schema.posts.id })

      const file = await ctx.db.insert(schema.files).values(input.file.map<InsertFiles>((f) => {
        const pid = uuidv4()
        return {
          id: f.fileId,
          url: f.url,
          name: `${ctx.session.userId}-post-${pid}`,
          path: f.path,
          height: f.height,
          width: f.width,
          postId: post[0]?.postId
        }
      })
      )
      await sendHashTag({
        data: {
          message: input.content
        }
      })
      return {
        ...post,
        files: file
      }
    } catch (error) {
      console.log(error)
    }
  }),

  all: protectedProcedure.query(async ({ ctx }) => {
    try {
      const posts = await ctx.db.query.posts.findMany({
        with: {
          files: true,
          author: true,
        },
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      });

      const reactions = await ctx.db.query.reactions.findMany({
        where: eq(schema.reactions.userId, ctx.auth.userId!)
      })

      const userIds = posts.map(p => p.authorId);
      const users = await clerkClient.users.getUserList({ userId: userIds });

      const userData: { [userId: string]: ReturnUserType } = {};

      users.map((u) => {
        if (!userData[u.id]) {
          userData[u.id] = {
            imageUrl: u.imageUrl,
            id: u.id,
            hasImage: u.hasImage,
            gender: u.gender,
            username: u.username,
            firstName: u.firstName,
            lastName: u.lastName,
            emailAddresses: u.emailAddresses,
            publicMetadata: u.publicMetadata
          }
        }
      })
      return posts.map((post) => {
        const fromNow = moment(post.createdAt!).fromNow()
        const hasReacted = reactions.find((r) => r.postId === post.id)
        return {
          ...post,
          fromNow,
          hasReacted: hasReacted?.type,
          author: userData[post.authorId],
        }
      })

    } catch (error) {
      console.log(error)
    }
  }),

  react: protectedProcedure.input(ReactPostApiInput).mutation(async ({ ctx, input }) => {
    try {
      const hasRecord = await ctx.db.query.reactions.findFirst({
        where: and(eq(schema.reactions.userId, ctx.auth.userId!), eq(schema.reactions.postId, input.postId)),
        columns: { type: true, id: true, postId: true }
      })
      // Id already reacted switchin between reactions and swtiching counts  
      if (hasRecord && hasRecord.type !== input.type) {
        if (hasRecord.type === "like") {
          await ctx.db.update(schema.posts).set({
            dislikes: sql`${schema.posts.dislikes} + 1`,
            likes: sql`${schema.posts.likes} - 1`
          }).where(eq(schema.posts.id, hasRecord.postId))
        } else {
          await ctx.db.update(schema.posts).set({
            dislikes: sql`${schema.posts.dislikes} - 1`,
            likes: sql`${schema.posts.likes} + 1`
          }).where(eq(schema.posts.id, hasRecord.postId))

        }
        return await ctx.db.update(schema.reactions).set({
          type: input.type,

        }).where(eq(schema.reactions.id, hasRecord.id))
      } else if (hasRecord && hasRecord.type === input.type) {
        // removing and decreasing count if already reacted
        await ctx.db.update(schema.posts).set(input.type === "like" ? {
          likes: sql`${schema.posts.likes} - 1`
        } : {
          dislikes: sql`${schema.posts.dislikes} - 1`
        }).where(eq(schema.posts.id, input.postId))

        return await ctx.db.delete(schema.reactions).where(
          and(
            eq(schema.reactions.userId, ctx.auth.userId!),
            eq(schema.reactions.postId, input.postId)
          )
        )

      }
      //adding  new Like and increasing count 
      await ctx.db.update(schema.posts).set(input.type === "like" ? {
        likes: sql`${schema.posts.likes} + 1`
      } : {
        dislikes: sql`${schema.posts.dislikes} + 1`
      }).where(eq(schema.posts.id, input.postId))

      return await ctx.db.insert(schema.reactions).values({
        id: uuidv4(),
        type: input.type,
        postId: input.postId,
        userId: ctx.auth.userId!,
      })

    } catch (error) {
      console.log(error)
    }
  }),
  byId: protectedProcedure.input(z.object({
    id: z.string()
  })).query(async ({ input, ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      where: eq(schema.posts.id, input.id),
      with: {
        files: true,
        author: true,
        comments: true
      }
    })
    if (!post) return

    const reaction = await ctx.db.query.reactions.findFirst({
      where: and(eq(schema.reactions.postId, post?.id!), eq(schema.reactions.userId, ctx.auth.userId!))
    })

    const u: ReturnUserType = await clerkClient.users.getUser(post.authorId)
    return {
      ...post,
      hasReacted: reaction?.type,
      fromNow: moment(post.createdAt!).fromNow() ?? '',
      author: {
        imageUrl: u.imageUrl,
        id: u.id,
        hasImage: u.hasImage,
        gender: u.gender,
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        emailAddresses: u.emailAddresses,
        publicMetadata: u.publicMetadata
      } as ReturnUserType
    }
  })

})



export type ReturnUserType = Pick<User, "lastName" | "emailAddresses" | "firstName" | "username" | "imageUrl" | "id" | "hasImage" | "publicMetadata" | "gender">



