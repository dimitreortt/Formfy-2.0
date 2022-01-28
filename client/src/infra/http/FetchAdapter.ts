import HttpClient from './HttpClient';

type HttpRequestMethod = 'POST' | 'GET' | 'PATCH' | 'DELETE';

export class FetchAdapter implements HttpClient {
  request(url: string, method: HttpRequestMethod, data?: object): Promise<any> {
    const options = { method, body: data ? JSON.stringify(data) : undefined };
    return fetch(url, options).then((res: any) => res.json());
  }
}
