import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import createFetchLink from './createFetchLink';
import createCache from './createCache';

let apolloClient = null;

function create(initialState, { ctx }) {
  const cache = createCache();
  const fetchLink = createFetchLink(ctx);

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      fetchLink,
    ]),
    cache: cache.restore(initialState || {}),
  });
}

export default function ({ initialState = {}, ctx } = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, { ctx });
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, { ctx });
  }

  return apolloClient;
}
