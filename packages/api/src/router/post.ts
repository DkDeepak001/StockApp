import { schema } from "@stockHub/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(schema.users).limit(1);
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @cap10/auth package
    return "you can see this secret message!";
  }),
});
