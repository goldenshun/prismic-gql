import _merge from 'lodash/merge';

export const resolvers = {
  Query: {},
};

const resolverFiles = require.context(
  './graphql',
  true,
  /^.*(directive|enum|field|input|mutation|scalar|query)\.js$/,
);

resolverFiles.keys().forEach((file) => {
  const { resolverMap } = resolverFiles(file);
  _merge(resolvers, resolverMap);
});
