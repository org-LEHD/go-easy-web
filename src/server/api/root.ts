import { createTRPCRouter } from "~/server/api/trpc";
import { advertisementRouter } from "./routers/advertisement";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  advertisement: advertisementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
