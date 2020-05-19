/* eslint-disable class-methods-use-this */
import { getApi } from '../../../lib/prismic';

export class PrismicRestDataSource {
  async getSection(args) {
    console.time('PrismicRestDataSource getSection');
    const api = await getApi();
    const section = await api.getByUID('section', args.uid);
    console.timeLog('PrismicRestDataSource getSection');
    return section;
  }
}
