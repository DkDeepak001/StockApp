import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { NseIndia } from "stock-nse-india";
const nseIndia = new NseIndia()
export const stockRouter = createTRPCRouter({
  bySymbol: protectedProcedure.input(z.object({
    symbol: z.string()
  })).query(async ({ input, ctx }) => {
    try {
      const data = await nseIndia.getEquityDetails('IRCTC')
      console.log(data)
      return data

    } catch (error) {
      console.log(error)
    }

  })
})
