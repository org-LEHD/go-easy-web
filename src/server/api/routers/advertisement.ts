/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const advertisementRouter = createTRPCRouter({
  // GET BY ID
  getById: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    return await ctx.prisma.advertisement.findFirst({
      where: { id: input },
      include: { location: true },
    });
  }),

  /**
   * GET ALL BY USER ID
   */
  getAllByUserId: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.advertisement.findMany({
        where: { location: {userId: input} },
        include: { location: true, },
      });
    }),
  /**
   * GET ALL BY LOCATION ID
   */
    getAllByLocationId: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.advertisement.findMany({
        where: { locationId: input },
        include: { location: true },
      });
    }),
  // GET ALL
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.advertisement.findMany({});
  }),

  // CREATE
  create: protectedProcedure
    .input(
      z.object({
        locationId: z.number(),
        title: z.string(),
        description: z.string(),
        media: z.string(),
        start: z.date(),
        end: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.advertisement.create({
        data: { ...input },
      });
    }),

  // UPDATE
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        locationId: z.number(),
        title: z.string(),
        description: z.string().optional(),
        media: z.string().optional(),
        start: z.date(),
        end: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.advertisement.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),

  // DELETE
  delete: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.prisma.advertisement.delete({ where: { id: input } });
  }),
});
