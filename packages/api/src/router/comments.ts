import { schema } from "@stockHub/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { AddCommentApiInput } from "@stockHub/validators";
import { v4 as uuidv4 } from 'uuid';
import { z } from "zod";
import { eq } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs";
import { ReturnUserType } from "./post";
import moment from "moment";

export const commentRouter = createTRPCRouter({
  add: protectedProcedure.input(AddCommentApiInput).mutation(async ({ input, ctx }) => {
    return ctx.db.insert(schema.comments).values({
      id: uuidv4(),
      postId: input.postId,
      userId: ctx.auth.userId!,
      comment: input.comment,
    })
  }),
  all: protectedProcedure.input(z.object({
    id: z.string()
  })).query(async ({ input, ctx }) => {
    const comments = await ctx.db.query.comments.findMany({
      where: eq(schema.comments.postId, input.id),
      orderBy: (comments, { asc, desc }) => [desc(comments.createdAt)]
    })
    const users = await clerkClient.users.getUserList({ userId: comments.map(c => c.userId) })
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
    return comments.map((comment) => {
      const fromNow = moment(comment.createdAt!).fromNow()
      return {
        ...comment,
        fromNow,
        author: userData[comment.userId]
      }

    })



  })
})
