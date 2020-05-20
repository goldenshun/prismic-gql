import { getApi } from '../lib/prismic';

const SSGPage = ({ section }) => (
  <div>
    <p>Filter by /ssg (Doc) in the Networks tab</p>
    <p>Note the Prismic.io fetch happens at build time.</p>
    <pre style={{ backgroundColor: '#f8f8f8' }}>
      {section && JSON.stringify(section, null, 2)}
    </pre>
  </div>
);

export async function getStaticProps() {
  console.time('ssg getStaticProps');
  const api = await getApi();
  const section = await api.getByUID('section', 'test-section');
  console.timeLog('ssg getStaticProps');
  return {
    props: { section }, // will be passed to the page component as props
  };
}

export default SSGPage;
