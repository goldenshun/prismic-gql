import { createProxyMiddleware } from 'http-proxy-middleware';
import apicache from 'apicache';
import { compose } from 'compose-middleware';
import { PRISMIC_URL } from '../../lib/prismic';

apicache.options({
  debug: true,
  headers: {
    'cache-control': 'no-cache',
  },
  appendKey: req => req.headers['prismic-ref'],
});

const prismicMiddleware = createProxyMiddleware({
  target: `${PRISMIC_URL}`,
  pathRewrite: { '^/api/prismic-proxy': '/graphql' },
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => { // eslint-disable-line
    // This is how you would set the prismic.io access token without exposing it
    // proxyReq.setHeader('Authorization', process.env.PRISMIC_ACCESS_TOKEN);
  },
});

// This could go in @gloojs/next-lib
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

// Technically we want longer durations, which should be fixed soon: https://github.com/kwhitley/apicache/issues/208
const prismicProxy = async (req, res) => {
  let resp;
  try {
    resp = await runMiddleware(req, res, compose(
      [apicache.middleware('5 minutes'), prismicMiddleware],
    ));
  } catch (e) {
    console.error(e);
  }

  return resp;
};

export default prismicProxy;
