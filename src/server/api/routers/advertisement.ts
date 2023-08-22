import { z } from "zod";
import { AdvertisementSchema } from "../../../../prisma/generated/zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const advertisementRouter = createTRPCRouter({
  // GET BY ID
  getById: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    return await ctx.prisma.advertisement.findFirst({
      where: { id: input },
    });
  }),

  /**
   * GET ALL BY ID
   */
  getAllById: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.advertisement.findMany({
        where: { locationId: input },
        include: { location: true },
      });
    }),

  // GET ALL
  getAll: publicProcedure
    .output(z.array(AdvertisementSchema))
    .query(({ ctx }) => {
      return ctx.prisma.advertisement.findMany({});
    }),

  // CREATE
  create: publicProcedure
    .input(
      z.object({
        locationId: z.number(),
        title: z.string(),
        description: z.string().optional(),
        start: z.date(),
        end: z.date(),
      })
    )
    .output(AdvertisementSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.advertisement.create({
        data: { ...input },
      });
    }),

  // UPDATE
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        locationId: z.number(),
        title: z.string(),
        description: z.string().optional(),
        start: z.date(),
        end: z.date(),
      })
    )
    .output(AdvertisementSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.advertisement.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),

  // DELETE
  delete: publicProcedure
    .output(AdvertisementSchema)
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.advertisement.delete({ where: { id: input } });
    }),
});