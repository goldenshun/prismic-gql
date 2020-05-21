import { ApolloServer } from 'apollo-server-express';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { PrismicRestDataSource } from './data-sources/PrismicRestDataSource';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { getApi } from '../../lib/prismic';

export const createApolloServer = () => new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    prismicRest: new PrismicRestDataSource(),
  }),
  plugins: [responseCachePlugin({
    extraCacheKeyData: async (context) => {
      const api = await getApi();
      return { masterRef: api.masterRef.ref };
    },
  })],
  debug: process.env.NODE_ENV !== 'production',
  playground: false,
  introspection: process.env.NODE_ENV !== 'production',
});
