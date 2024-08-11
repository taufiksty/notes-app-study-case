import { ApolloServer } from '@apollo/server';
import typeDefs from '@/app/api/graphql/schema';
import noteResolvers from '@/app/api/graphql/resolvers/noteResolver';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

const server = new ApolloServer({
  typeDefs,
  resolvers: noteResolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };
