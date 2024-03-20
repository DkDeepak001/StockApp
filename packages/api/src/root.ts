import { commentRouter } from "./router/comments";
import { hashTagRouter } from "./router/hashtag";
import { newsRouter } from "./router/news";
import { postRouter } from "./router/post";
import { stockRouter } from "./router/stocks";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  comment: commentRouter,
  hashTag: hashTagRouter,
  user: userRouter,
  stock: stockRouter,
  news: newsRouter
});

export type AppRouter = typeof appRouter;
