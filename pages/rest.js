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
      This is where the rest demo will go.
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
