import { schema } from "@stockHub/db/src";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { CreatePostApi } from "@stockHub/validators";
import { v4 as uuidv4 } from 'uuid';



type InsertFiles = typeof schema.files.$inferInsert

export const postRouter = createTRPCRouter({
  add: protectedProcedure.input(CreatePostApi).mutation(async ({ input, ctx }) => {

    const post = await ctx.db.insert(schema.posts).values({
      id: uuidv4(),
      tittle: input.title,
      description: input.content,
      authorId: ctx.session.userId,
    }).returning({ postId: schema.posts.id })

    const file = await ctx.db.insert(schema.files).values(input.file.map<InsertFiles>((f) => {
      const pid = uuidv4()
      return {
        id: pid,
        url: f.url,
        name: `${ctx.session.userId}-post-${pid}`,
        path: '',
        height: f.height,
        width: f.width,
        postId: post[0]?.postId
      }
    })
    )
    return {
      ...post,
      files: file
    }
  })
})
