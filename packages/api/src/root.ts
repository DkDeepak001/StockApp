import { commentRouter } from "./router/comments";
import { hashTagRouter } from "./router/hashtag";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  comment: commentRouter,
  hashTag: hashTagRouter
});

export type AppRouter = typeof appRouter;
