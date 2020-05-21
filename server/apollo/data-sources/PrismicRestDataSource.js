/* eslint-disable class-methods-use-this */
import { DataSource } from 'apollo-datasource';
import { getApi } from '../../../lib/prismic';

export class PrismicRestDataSource extends DataSource {
  async initialize() {
    // This gets the latest API version once per request
    this.api = await getApi();
  }

  async getSection(args) {
    console.log('PrismicRestDataSource getSection');
    const api = await getApi();
    return api.getByUID('section', args.uid);
  }
}
