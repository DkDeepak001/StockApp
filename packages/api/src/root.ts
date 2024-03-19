import { commentRouter } from "./router/comments";
import { hashTagRouter } from "./router/hashtag";
import { postRouter } from "./router/post";
import { stockRouter } from "./router/stocks";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  comment: commentRouter,
  hashTag: hashTagRouter,
  user: userRouter,
  stock: stockRouter
});

export type AppRouter = typeof appRouter;
