import HttpClient from './HttpClient';

type HttpRequestMethod = 'POST' | 'GET' | 'UPDATE' | 'DELETE';

export class FetchAdapter implements HttpClient {
  request(url: string, method: HttpRequestMethod, data: object): Promise<any> {
    return fetch(url, { method, body: JSON.stringify(data) }).then((res: any) => res.json());
  }
}
