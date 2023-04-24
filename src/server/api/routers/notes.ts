import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    const notes = await ctx.prisma.note.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });
    return notes;
  }),
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const note = await ctx.prisma.note.create({
        data: { userId, content: input.content },
      });
      return note;
    }),
  findUnique: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const note = await ctx.prisma.note.findUnique({
        where: { id: input.id },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.note.delete({ where: { id: input.id } });
    }),
});
export const usersRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const note = await ctx.prisma.note.create({
        data: { userId, content: input.content },
      });
      return note;
    }),
});
