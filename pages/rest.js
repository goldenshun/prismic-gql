import { useEffect } from 'react';
import { getApi } from '../lib/prismic';

const RestPage = () => {
  useEffect(() => {
    (async () => {
      console.time('rest useEffect');
      const api = await getApi();
      await api.getByUID('section', 'test-section');
      console.timeLog('rest useEffect');
    })();
  }, []);

  return (
    <div>
      <p>Filter by documents/search in the Networks tab.</p>
      <p>Sample response times range between 140ms - 380ms</p>
      <p>Also note the x-cache: Miss from cloudfront response header</p>
    </div>
  );
};

export async function getServerSideProps() {
  console.time('rest getServerSideProps');
  const api = await getApi();
  const section = await api.getByUID('section', 'test-section');
  console.timeLog('rest getServerSideProps');
  return {
    props: section,
  };
}

export default RestPage;
