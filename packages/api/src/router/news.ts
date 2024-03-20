import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
//@ts-ignore for @type/NewsAPI
import NewsAPI from 'newsapi'
const newsapi = new NewsAPI('88d49178bc2245bfaef4c5b0a9510918');

export const newsRouter = createTRPCRouter({

  all: protectedProcedure.input(z.object({
    q: z.string().optional()
  })).query(async ({ input }) => {
    const top: NewsResponse = await newsapi.v2.topHeadlines({
      category: "business",
      language: 'en',
      country: 'in',
      q: input.q
    })
    return top
  })
})


type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type NewsResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};
