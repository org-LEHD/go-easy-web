import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { Access, Role } from "@prisma/client";

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
  update: publicProcedure
    .input(z.object({ id: z.number(), name: z.string(), email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),
  /**
   * UPDATE ACCESS
   */
  updateAccess: publicProcedure
    .input(z.object({ id: z.number(), access: z.nativeEnum(Access), }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),
  /**
   * UPDATE ROLE
   */
  updateRole: publicProcedure
    .input(z.object({ id: z.number(), role: z.nativeEnum(Role), }))
    .mutation(async ({ input, ctx }) => {
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
