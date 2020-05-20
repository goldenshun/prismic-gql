import { useEffect, useState } from 'react';
import { getApi } from '../lib/prismic';

const SSGRestrictedPage = ({ section }) => {
  const [hasAccess, setHasAccess] = useState(false);
  useEffect(() => {
    const rand = Math.floor(Math.random() * 2);
    if (rand === 1) {
      setHasAccess(true);
    }
  }, []);

  if (hasAccess === false) return <div>No access. Refresh to try again.</div>;

  return (
    <div>
      <p>Filter by /ssg (Doc) in the Networks tab</p>
      <p>This page simulates access control checks on the client combined with prefetched content.</p>
      <p>Note the Prismic.io fetch happens at build time.</p>
      <pre style={{ backgroundColor: '#f8f8f8' }}>
        {section && JSON.stringify(section, null, 2)}
      </pre>
    </div>
  );
};

export async function getStaticProps() {
  console.time('ssg getStaticProps');
  const api = await getApi();
  const section = await api.getByUID('section', 'test-section');
  console.timeLog('ssg getStaticProps');
  return {
    props: { section }, // will be passed to the page component as props
  };
}

export default SSGRestrictedPage;
