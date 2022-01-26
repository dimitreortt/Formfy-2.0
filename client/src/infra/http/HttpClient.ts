export default interface HttpClient {
  request(url: string, method: string, data: object): any;
}
