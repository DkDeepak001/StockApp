import { commentRouter } from "./router/comments";
import { hashTagRouter } from "./router/hashtag";
import { postRouter } from "./router/post";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  comment: commentRouter,
  hashTag: hashTagRouter,
  user: userRouter
});

export type AppRouter = typeof appRouter;
