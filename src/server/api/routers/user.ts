import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { UserSchema } from "prisma/schemas";

export const userRouter = createTRPCRouter({
  /**
   * CREATE
   * Users are created as they sign up through the third-party providers
   */

  /**
   *  READ
   */
  getById: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    return await ctx.prisma.user.findFirst({
      where: { id: input },
      include: { accounts: true, sessions: true, locations: true },
    });
  }),

  // GET ALL
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      include: { accounts: true, sessions: true, locations: true },
    });
  }),

  /**
   * UPDATE
   */
  update: publicProcedure.input(UserSchema).mutation(async ({ input, ctx }) => {
    return await ctx.prisma.user.update({
      where: { id: input.id },
      data: { ...input },
    });
  }),
  /**
   * DELETE
   */
  delete: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.prisma.user.delete({ where: { id: input } });
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
