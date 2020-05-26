import _get from 'lodash/get';
import gql from 'graphql-tag';
import { RichText } from 'prismic-reactjs';
import usePrismicProxyQuery from '../lib/apollo-client/usePrismicProxyQuery';

const GET_SECTION = gql`
  query GetSection {
    section(uid: "test-section", lang: "en-us") {
      body
      data_visualizations {
        title
        value
      }
    }
  }
`;

const GraphQLPage = () => {
  const { data } = usePrismicProxyQuery(GET_SECTION);
  console.log({ data });

  return (
    <div>
      <p>Filter by prismic-proxy in the Networks tab.</p>
      <p>Sample response times range between 14ms - 25ms</p>
      <p>Also note the x-cache: Hit from cloudfront response header</p>
      <RichText render={_get(data, 'section.body', [])} />
    </div>
  );
};

export default GraphQLPage;
