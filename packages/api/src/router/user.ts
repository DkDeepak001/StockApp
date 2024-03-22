import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { and, eq, like } from "drizzle-orm";
import { schema } from "@stockHub/db";
import { FollowingApiInput, RegisterApiInput } from "@stockHub/validators";
import { v4 as uuidv4 } from 'uuid';

export const userRouter = createTRPCRouter({
  byId: protectedProcedure.input(z.object({
    id: z.string()
  })).query(async ({ input, ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(schema.users.userId, input.id),
      with: {
        posts: {
          with: {
            files: true
          }
        },
        following: true,
        follwers: true
      }
    })
    console.log(user)


    return {
      ...user,
      post: user?.posts,
      followers: user?.follwers,
      follwing: user?.following,
      hasFollowing: user?.following.map(f => f.followerId).includes(ctx.session.userId)

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
  }),
  add: publicProcedure.input(RegisterApiInput).mutation(async ({ input, ctx }) => {
    return await ctx.db.insert(schema.users).values({
      id: uuidv4(),
      imgUrl: input.imgUrl,
      userName: input.username,
      userId: input.userId,
      lastName: input.lastName,
      firstName: input.firstName
    })
  })

})
