import { getApi } from '../../../../lib/prismic';

export const resolverMap = {
  Query: {
    async prismicApi() {
      const api = await getApi();
      return {
        masterRef: api.masterRef.ref,
      };
    },
  },
};
