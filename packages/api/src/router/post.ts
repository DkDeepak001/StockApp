import { schema } from "@stockHub/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { CreatePostApi } from "@stockHub/validators";
import { v4 as uuidv4 } from 'uuid';
import { clerkClient } from '@clerk/nextjs';
import { User } from "@clerk/nextjs/dist/types/server";
import moment from "moment";


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
    return {
      ...post,
      files: file
    }
  }),
  all: protectedProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.query.posts.findMany({
      with: {
        files: true,
        author: true
      }
    });

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
      return {
        ...post,
        fromNow,
        author: userData[post.authorId],
      }
    })
  })
})



export type ReturnUserType = Pick<User, "lastName" | "emailAddresses" | "firstName" | "username" | "imageUrl" | "id" | "hasImage" | "publicMetadata" | "gender">



