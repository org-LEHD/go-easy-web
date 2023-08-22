import { createTRPCRouter } from "~/server/api/trpc";
import { advertisementRouter } from "./routers/advertisement";
import { locationRouter } from "./routers/location";
import { pointOfInterestRouter } from "./routers/pointofinterest";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  advertisement: advertisementRouter,
  location: locationRouter,
  pointOfInterest: pointOfInterestRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
