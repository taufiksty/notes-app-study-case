import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '@/graphql/schema';
import noteResolvers from '@/graphql/resolvers/noteResolver';

const server = new ApolloServer({
  typeDefs,
  resolvers: noteResolvers,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
