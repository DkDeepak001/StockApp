import { createTRPCRouter, protectedProcedure } from "../trpc";

export const hashTagRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx, input }) => {
    return ctx.db.query.hashTag.findMany({})
  })
})
