import Prismic from 'prismic-javascript';

export const PRISMIC_URL = 'https://sean-prismic-demo.prismic.io';

export const getApi = options => Prismic.getApi(`${PRISMIC_URL}/api/v2`, options);

export const linkResolver = () => '/';

export { Prismic };
