import _get from 'lodash/get';
import fetch from 'node-fetch';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
// import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { PrismicLink } from 'apollo-link-prismic';
import getConfig from 'next/config';
import { PRISMIC_URL } from '../prismic';

const { publicRuntimeConfig } = getConfig();
const PORT = publicRuntimeConfig ? publicRuntimeConfig.PORT : 3000;

export default function createFetchLink(ctx) {
  const baseUrl = ctx && ctx.req ? `http://localhost:${PORT}` : '';

  // const defaultLink = createPersistedQueryLink({ useGETForHashedQueries: true }).concat(createHttpLink({
  //   uri: `${baseUrl}/api/graphql`,
  //   fetch: !process.browser ? fetch : undefined,
  //   headers: _get(ctx, 'req.headers'), // Pass headers (including cookies) through on server -> server calls
  // }));
  const defaultLink = createHttpLink({
    uri: `${baseUrl}/api/graphql`,
    fetch: !process.browser ? fetch : undefined,
    headers: _get(ctx, 'req.headers'), // Pass headers (including cookies) through on server -> server calls
  });

  const prismicLink = PrismicLink({
    uri: `${PRISMIC_URL}/graphql`,
  });

  const prismicProxyLink = PrismicLink({
    uri: '/api/prismic-proxy',
    repositoryName: 'sean-prismic-demo',
  });

  const splitPrismicLink = ApolloLink.split(operation => operation.getContext().clientName === 'prismic-proxy', prismicProxyLink, prismicLink);

  return ApolloLink.split((operation) => {
    const { clientName } = operation.getContext();
    return clientName.includes('prismic');
  },
  splitPrismicLink,
  defaultLink);
}
