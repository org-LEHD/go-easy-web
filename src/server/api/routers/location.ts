import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Category } from "@prisma/client";

export const locationRouter = createTRPCRouter({
  /**
   * CREATE
   */
  create: publicProcedure
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
        include: { Advertisement: true },
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
        include: { Advertisement: true, user: true },
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
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        userId: z.number(),
        category: z.nativeEnum(Category).optional(),
        name: z.string(),
        address: z.string(),
        phone: z.number(),
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
  delete: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.prisma.location.delete({ where: { id: input } });
  }),
});
