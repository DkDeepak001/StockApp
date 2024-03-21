import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";
import { ReturnUserType } from "./post";
import { and, eq, like } from "drizzle-orm";
import { schema } from "@stockHub/db";
import { FollowingApiInput } from "@stockHub/validators";
import { v4 as uuidv4 } from 'uuid';

export const userRouter = createTRPCRouter({
  byId: protectedProcedure.input(z.object({
    id: z.string()
  })).query(async ({ input, ctx }) => {
    const post = await ctx.db.query.posts.findMany({
      where: eq(schema.posts.authorId, input.id),
      with: {
        files: true
      }

    })
    const userData = await clerkClient.users.getUser(input.id) as ReturnUserType

    return {
      ...userData,
      post: post
    }
  }),
  follow: protectedProcedure.input(FollowingApiInput).mutation(async ({ input, ctx }) => {
    try {
      const follow = await ctx.db.insert(schema.following).values({
        id: uuidv4(),
        followerId: ctx.session.userId,
        followingId: input.followingId
      })
      return follow
    } catch (error) {
      //@ts-ignore
      if (error.toString().includes("duplicate key value violates unique constraint")) {
        await ctx.db.delete(schema.following).where(and(eq(schema.following.followerId, ctx.session.userId), eq(schema.following.followingId, input.followingId)))
      }
      console.log(error)
      return error
    }
  }),
  search: protectedProcedure.input(z.object({
    q: z.string()
  })).query(async ({ input, ctx }) => {
    if (input.q === '') return []
    return await ctx.db.select().from(schema.users).where(like(schema.users.userName, `%${input.q}%`));
  })

})
