import { createTRPCRouter } from "~/server/api/trpc";
import { advertisementRouter } from "./routers/advertisement";
import { pointOfInterestRouter } from "./routers/pointofinterest";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  advertisement: advertisementRouter,
  pointOfInterest: pointOfInterestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
