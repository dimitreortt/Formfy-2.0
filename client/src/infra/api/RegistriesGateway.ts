import { RegistryValues, RegistryFieldChange } from './../../domain/Registry';
import HttpClient from '../http/HttpClient';

export class RegistriesGateway {
  serverBaseUrl = 'http://localhost:4000/';
  constructor(readonly httpClient: HttpClient) {}

  getRegistries(formId: number) {
    const url = `${this.serverBaseUrl}/registries`;
    const data = { formId };
    return this.httpClient.request(url, 'PATCH', data);
  }

  postRegistry(formId: number, values: RegistryValues) {
    const url = `${this.serverBaseUrl}/registry`;
    const data = {
      formId,
      values,
    };
    return this.httpClient.request(url, 'PATCH', data);
  }

  uodateRegistry(registryId: number, changes: RegistryFieldChange[]) {
    const url = `${this.serverBaseUrl}/registry`;
    const data = {
      registryId,
      changes,
    };
    return this.httpClient.request(url, 'PATCH', data);
  }

  deleteRegistry(registryId: number) {
    const url = `${this.serverBaseUrl}/registry`;
    const data = {
      registryId,
    };
    return this.httpClient.request(url, 'PATCH', data);
  }
}
