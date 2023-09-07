import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Category } from "@prisma/client";

export const locationRouter = createTRPCRouter({
  /**
   * CREATE
   */
  create: protectedProcedure
    .input(
      z.object({
        userId: z.number(),
        category: z.nativeEnum(Category).optional(),
        name: z.string(),
        address: z.string(),
        lat: z.number(),
        long: z.number(),
        phone: z.number(),
        thumbnail: z.string(),
        website: z.string(),
        summary: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.location.create({
        data: { ...input },
        include: { advertisements: true },
      });
    }),

  /**
   *  READ
   */
  getById: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    return await ctx.prisma.location.findUnique({
      where: { id: input },
    });
  }),

  /**
   * GET ALL BY ID
   */
  getAllById: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.location.findMany({
        where: { userId: input },
        include: { advertisements: true, user: true },
      });
    }),
  /**
   * GET ALL
   */
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.location.findMany({});
  }),

  /**
   * UPDATE
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        userId: z.number(),
        category: z.nativeEnum(Category).optional(),
        name: z.string(),
        address: z.string(),
        phone: z.number(),
        lat: z.number(),
        long: z.number(),
        website: z.string().optional(),
        thumbnail: z.string().optional(),
        summary: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.location.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),
  /**
   * DELETE
   */
  delete: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.prisma.location.delete({ where: { id: input } });
  }),
});
