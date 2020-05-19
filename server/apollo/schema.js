const schemaFiles = require.context(
  './graphql',
  true,
  /^.*\.gql$/,
);

const definitions = [];
schemaFiles.keys().forEach((file) => {
  const typedef = schemaFiles(file);
  definitions.push(typedef);
});

// console.log(definitions.map(d => d.definitions));

const baseSchema = `
  type Query

  schema {
    query: Query
  }
`;

export const typeDefs = [baseSchema, ...definitions];
