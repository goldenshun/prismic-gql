import { GraphQLScalarType } from 'graphql';

export const resolverMap = {
  Void: new GraphQLScalarType({
    name: 'Void',

    description: 'Represents a void return value',

    serialize() {
      return null;
    },

    parseValue() {
      return null;
    },

    parseLiteral() {
      return null;
    },
  }),
};

