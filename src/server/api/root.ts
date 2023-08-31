import { createTRPCRouter } from "~/server/api/trpc";
import { advertisementRouter } from "./routers/advertisement";
import { locationRouter } from "./routers/location";
import { attractionRouter } from "./routers/attraction";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  advertisement: advertisementRouter,
  location: locationRouter,
  attraction: attractionRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
