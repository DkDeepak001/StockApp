import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";
import { ReturnUserType } from "./post";
import { eq } from "drizzle-orm";
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
      console.log(follow)
      return follow
    } catch (error) {
      console.log(error)
    }

  })
})
