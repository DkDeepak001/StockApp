import { schema } from "@stockHub/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { CreatePostApi, ReactPostApiInput } from "@stockHub/validators";
import { v4 as uuidv4 } from 'uuid';
import { User } from "@clerk/nextjs/dist/types/server";
import moment from "moment";
import { eq, and, sql } from 'drizzle-orm'
import { z } from "zod";
import { sendHashTag } from "../utils/kafka";
import { withCursorPagination } from 'drizzle-pagination'
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
          postId: post[0]?.postId!,
          description: input.content
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

  all: protectedProcedure.input(z.object({
    cursor: z.string().nullish(),
    limit: z.number().min(0).max(50).default(5)
  })).query(async ({ ctx, input }) => {
    try {
      const posts = await ctx.db.query.posts.findMany({
        ...withCursorPagination({
          limit: input.limit,
          cursors: [[
            schema.posts.createdAt,
            'desc',
            input.cursor ? new Date(input.cursor) : undefined
          ]]
        }),
        with: {
          files: true,
          author: true
        }
      }
      );

      const reactions = await ctx.db.query.reactions.findMany({
        where: eq(schema.reactions.userId, ctx.auth.userId!)
      })

      return {
        nextCursor: posts.length ? posts[posts.length - 1]?.createdAt?.toISOString() : null,
        posts: posts.map((post) => {
          const fromNow = moment(post.createdAt!).fromNow()
          const hasReacted = reactions.find((r) => r.postId === post.id)
          return {
            ...post,
            fromNow,
            hasReacted: hasReacted?.type,
          }
        })
      }

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
    return {
      ...post,
      hasReacted: reaction?.type,
      fromNow: moment(post.createdAt!).fromNow() ?? '',
    }
  })

})



export type ReturnUserType = Pick<User, "lastName" | "emailAddresses" | "firstName" | "username" | "imageUrl" | "id" | "hasImage" | "publicMetadata" | "gender">



