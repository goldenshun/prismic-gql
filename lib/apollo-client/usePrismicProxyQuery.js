import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { parseCookies } from 'nookies';

const usePrismicProxyQuery = (query, options = {}) => {
  const [previewRefUrl, setPreviewRefUrl] = useState(null);
  useEffect(() => {
    const cookies = parseCookies();
    const prismicPreviewCookie = cookies['io.prismic.preview'];
    if (prismicPreviewCookie) {
      const parsed = JSON.parse(prismicPreviewCookie);
      const projectCookie = parsed['sean-prismic-demo.prismic.io'];
      if (projectCookie) {
        setPreviewRefUrl(projectCookie.preview);
      }
    }
  }, []);

  const headers = previewRefUrl ? {
    'Prismic-ref': previewRefUrl,
  } : null;

  return useQuery(query, {
    context: {
      clientName: 'prismic-proxy',
      headers,
    },
    ...options,
  });
};

export default usePrismicProxyQuery;
