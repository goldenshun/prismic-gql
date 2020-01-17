import _get from 'lodash/get';
import fetch from 'node-fetch';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { PrismicLink } from 'apollo-link-prismic';
import getConfig from 'next/config';
import { PRISMIC_URL } from '../prismic';

const { publicRuntimeConfig } = getConfig();
const { PORT } = publicRuntimeConfig;

export default function createFetchLink(ctx) {
  const baseUrl = ctx && ctx.req ? `http://localhost:${PORT || 3000}` : '';

  const defaultLink = createUploadLink({
    uri: `${baseUrl}/api/graphql`,
    fetch: !process.browser ? fetch : undefined,
    headers: _get(ctx, 'req.headers'), // Pass headers (including cookies) through on server -> server calls
  });

  const prismicLink = PrismicLink({
    uri: `${PRISMIC_URL}/graphql`,
  });

  return ApolloLink.split(operation => operation.getContext().clientName === 'prismic',
    prismicLink,
    defaultLink);
}
