import HttpClient from '../http/HttpClient';

export class FormsDAO {
  constructor(readonly httpClient: HttpClient) {}

  getForms() {
    const serverUrl = 'http://localhost:4000/forms';
    return this.httpClient.request(serverUrl, 'GET');
  }
}
