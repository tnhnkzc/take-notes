import { createTRPCRouter } from "~/server/api/trpc";
import { notesRouter, usersRouter } from "~/server/api/routers/notes";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  notes: notesRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
