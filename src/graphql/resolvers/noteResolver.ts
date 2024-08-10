import prisma from '@/prisma/client';

const noteResolvers = {
  Query: {
    notes: async () => {
      return await prisma.note.findMany();
    },
    note: async (_: any, { id }: { id: number }) => {
      return await prisma.note.findUnique({ where: { id } });
    },
  },
  Mutation: {
    createNote: async (
      _: any,
      { title, body }: { title: string; body?: string }
    ) => {
      return await prisma.note.create({ data: { title, body } });
    },
    updateNote: async (
      _: any,
      { id, title, body }: { id: number; title: string; body?: string }
    ) => {
      return await prisma.note.update({ where: { id }, data: { title, body } });
    },
    deleteNote: async (_: any, { id }: { id: number }) => {
      return await prisma.note.delete({ where: { id } });
    },
  },
};

export default noteResolvers;
