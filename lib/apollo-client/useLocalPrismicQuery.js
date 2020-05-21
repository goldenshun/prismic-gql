/*
  The purpose of this file is to create a consistent access pattern for prismic.io content such that:
  - Caching is enabled by default
  - Changes to the masterRef invalidate the cache
*/
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const PRISMIC_API_QUERY = gql`
  query PrismicApi {
    prismicApi {
      masterRef
    }
  }
`;

const getPrismicQuery = ({ fragment, operationName }) => gql`
  query ${operationName}($masterRef: String, $skip: Boolean!) {
    prismic(masterRef: $masterRef) @skip(if: $skip) {
      ${fragment}
    }
  }
`;

const useLocalPrismicQuery = (fragment, options = {}) => {
  const { data, error } = useQuery(PRISMIC_API_QUERY);

  if (error) {
    console.error(error);
  }
  const mergedOptions = {
    ...options,
    variables: {
      ...options.variables,
      masterRef: data && data.prismicApi.masterRef,
      skip: !(data && data.prismicApi.masterRef), // Stupid but the top level `skip` doesn't seem to work: https://github.com/apollographql/react-apollo/issues/3492
    },
  };
  return useQuery(getPrismicQuery({ fragment, operationName: 'PrismicQuery' }), mergedOptions);
};

export default useLocalPrismicQuery;
