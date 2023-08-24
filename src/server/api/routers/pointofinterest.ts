import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { PointOfInterestSchema } from "../../../../prisma/generated/zod";
import { Category } from "@prisma/client";

export const pointOfInterestRouter = createTRPCRouter({
  /**
   * CREATE
   */
  create: publicProcedure
    .input(
      z.object({
        category_id: z.nativeEnum(Category),
        title: z.string(),
        address: z.string(),
        lat: z.number(),
        long: z.number(),
        media: z.string(),
      })
    )
    .output(PointOfInterestSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.pointOfInterest.create({
        data: { ...input },
      });
    }),

  /**
   *  READ
   */
  getById: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    return await ctx.prisma.pointOfInterest.findUnique({
      where: { id: input },
    });
  }),
  /**
   * GET ALL
   */
  getAll: publicProcedure
    .output(z.array(PointOfInterestSchema))
    .query(({ ctx }) => {
      return ctx.prisma.pointOfInterest.findMany({});
    }),

  /**
   * UPDATE
   */
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      category_id: z.nativeEnum(Category),
      title: z.string(),
      address: z.string(),
      lat: z.number(),
      long: z.number(),
      media: z.string().optional(),
    }))
    .output(PointOfInterestSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.pointOfInterest.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),
  /**
   * DELETE
   */
  delete: publicProcedure
    .output(PointOfInterestSchema)
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.pointOfInterest.delete({ where: { id: input } });
    }),
});
