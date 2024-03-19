import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { schema } from "@stockHub/db";
import { NseIndia } from "stock-nse-india";
const nseIndia = new NseIndia()

export const hashTagRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx, input }) => {
    return ctx.db.query.hashTag.findMany({})
  }),
  byId: protectedProcedure.input(z.object({
    id: z.string()
  })).query(async ({ input, ctx }) => {
    try {
      const tag = await ctx.db.query.hashTag.findFirst({
        where: eq(schema.hashTag.id, input.id),
      })
      const stock = await nseIndia.getEquityDetails(tag?.name!)
      console.log(stock)
      return {
        ...tag,
        isStock: stock.info ? true : false,
        stock: stock.info ? stock : null
      }


    } catch (error) {
      console.log(error)
    }

  })
})
