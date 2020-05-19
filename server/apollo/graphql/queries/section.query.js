export const resolverMap = {
  Query: {
    section(_, args, { dataSources }) {
      return dataSources.prismicRest.getSection(args);
    },
  },
};
