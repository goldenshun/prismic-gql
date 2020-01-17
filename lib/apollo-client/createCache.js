import { InMemoryCache } from 'apollo-cache-inmemory';

export default function createCache() {
  return new InMemoryCache({
    addTypename: true,
    cacheRedirects: {
      Query: { },
    },
  });
}
