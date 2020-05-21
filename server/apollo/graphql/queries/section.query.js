export const resolverMap = {
  Prismic: {
    section(_, args, { dataSources }) {
      return dataSources.prismicRest.getSection(args);
    },
  },
};
