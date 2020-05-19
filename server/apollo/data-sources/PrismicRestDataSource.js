import { RESTDataSource } from 'apollo-datasource-rest';
import { PRISMIC_URL } from '../../../lib/prismic';

export class PrismicRestDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = PRISMIC_URL;
  }


  async getSection() {
    return { title: 'Yay' };
  }
}
