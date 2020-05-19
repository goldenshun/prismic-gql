import { ApolloServer } from 'apollo-server-express';
import { PrismicRestDataSource } from './data-sources/PrismicRestDataSource';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

export const createApolloServer = () => new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    prismicRest: new PrismicRestDataSource(),
  }),
  debug: process.env.NODE_ENV !== 'production',
  playground: false,
  tracing: true,
  cacheControl: true,
  introspection: true,
});
