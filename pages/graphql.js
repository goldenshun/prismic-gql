import gql from 'graphql-tag';
import usePrismicQuery from '../lib/apollo-client/usePrismicQuery';

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
  const { data } = usePrismicQuery(GET_SECTION);
  console.log({ data });

  return (
    <div>
      <p>Filter by prismic.io/graphql in the Networks tab.</p>
      <p>Sample response times range between 14ms - 25ms</p>
      <p>Also note the x-cache: Hit from cloudfront response header</p>
    </div>
  );
};

export default GraphQLPage;
