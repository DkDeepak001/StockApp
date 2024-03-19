import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";
import { ReturnUserType } from "./post";

export const userRouter = createTRPCRouter({
  byId: protectedProcedure.input(z.object({
    id: z.string()
  })).query(async ({ input }) => {
    return await clerkClient.users.getUser(input.id) as ReturnUserType
  })
})
