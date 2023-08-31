import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Category } from "@prisma/client";

export const attractionRouter = createTRPCRouter({
  /**
   * CREATE
   */
  create: publicProcedure
    .input(
      z.object({
        category: z.nativeEnum(Category),
        name: z.string(),
        address: z.string(),
        lat: z.number(),
        long: z.number(),
        thumbnail: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.attraction.create({
        data: { ...input },
      });
    }),

  /**
   *  READ
   */
  getById: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    return await ctx.prisma.attraction.findUnique({
      where: { id: input },
    });
  }),
  /**
   * GET ALL
   */
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.attraction.findMany({});
  }),

  /**
   * UPDATE
   */
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        category: z.nativeEnum(Category),
        name: z.string(),
        address: z.string(),
        lat: z.number(),
        long: z.number(),
        media: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.attraction.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),
  /**
   * DELETE
   */
  delete: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.prisma.attraction.delete({ where: { id: input } });
  }),
});
