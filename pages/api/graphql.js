import { createApolloServer } from '../../server/apollo/createApolloServer';

const apolloServer = createApolloServer();
const handler = apolloServer.getMiddleware({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
