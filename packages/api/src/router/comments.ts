import { schema } from "@stockHub/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { AddCommentApiInput } from "@stockHub/validators";
import { v4 as uuidv4 } from 'uuid';

export const commentRouter = createTRPCRouter({
  add: protectedProcedure.input(AddCommentApiInput).mutation(async ({ input, ctx }) => {
    return ctx.db.insert(schema.comments).values({
      id: uuidv4(),
      postId: input.postId,
      userId: ctx.auth.userId!,
      comment: input.comment,
    })
  })
})
