import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { schema } from "@stockHub/db";
import { NseIndia } from "stock-nse-india";
import moment from "moment";
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
        with: {
          posts: {
            with: {
              post: {
                with: {
                  files: true
                }
              }
            }
          }
        }
      })
      const stock = await nseIndia.getEquityDetails(tag?.name!)
      return {
        ...tag,
        posts: tag?.posts.map(p => {
          return {
            ...p, post: {
              ...p.post,
              fromNow: moment(p.post?.createdAt).fromNow()
            }
          }
        }),
        isStock: stock.info ? true : false,
        stock: stock.info ? stock : null
      }


    } catch (error) {
      console.log(error)
    }

  })
})
