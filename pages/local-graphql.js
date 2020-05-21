import _get from 'lodash/get';
import { RichText } from 'prismic-reactjs';
import useLocalPrismicQuery from '../lib/apollo-client/useLocalPrismicQuery';

const GET_SECTION_FRAGMENT = `
  section(uid: "test-section") {
    id
    data
  }
`;

const LocalGraphQLPage = () => {
  const { data, error } = useLocalPrismicQuery(GET_SECTION_FRAGMENT);
  if (error) {
    console.error(error);
  }

  return (
    <div>
      <p>Filter by graphql in the Networks tab.</p>
      <p>Sample response times range between 4-9ms (after initial cache hit)</p>
      <p>Note we are using Apollo @cacheControl directives here along with Automatic Persisted Queries for caching at all layers.</p>
      <RichText render={_get(data, 'prismic.section.data.body', [])} />
    </div>
  );
};

export default LocalGraphQLPage;
