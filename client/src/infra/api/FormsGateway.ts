import { IFormField } from "../../domain/FormField";
import HttpClient from "../http/HttpClient";

export class FormsGateway {
  serverBaseUrl = "http://localhost:4000";
  constructor(readonly httpClient: HttpClient) {}

  getForms() {
    const url = `${this.serverBaseUrl}/forms`;
    return this.httpClient.request(url, "GET");
  }

  postForm(name: string, fields: IFormField[]) {
    const url = `${this.serverBaseUrl}/form`;
    const data = {
      name,
      fields,
    };
    return this.httpClient.request(url, "POST", data);
  }

  updateForm(formName: string, newFormName: string) {
    const url = `${this.serverBaseUrl}/form`;
    const data = {
      name: formName,
      newName: newFormName,
    };
    return this.httpClient.request(url, "PATCH", data);
  }

  deleteForm(name: string) {
    const url = `${this.serverBaseUrl}/form`;
    const data = { name };
    return this.httpClient.request(url, "DELETE", data);
  }
}

export default FormsGateway;
