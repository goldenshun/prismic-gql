const compose = require('lodash/fp/compose');
const withGraphql = require('next-plugin-graphql');

module.exports = compose(
  withGraphql,
);
