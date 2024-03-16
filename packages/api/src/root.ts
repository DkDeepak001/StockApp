import { commentRouter } from "./router/comments";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  comment: commentRouter
});

export type AppRouter = typeof appRouter;
