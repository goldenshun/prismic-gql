import { getApi, linkResolver } from '../../lib/prismic';

const prismicPreview = async (req, res) => {
  const prismicApi = await getApi({ req, res });
  const url = await prismicApi.previewSession(req.query.token, linkResolver, '/');
  res.writeHead(302, {
    Location: url,
  });
  res.end();
};

export default prismicPreview;
