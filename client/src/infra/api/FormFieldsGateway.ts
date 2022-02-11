import { FormFieldType, IFormField } from "./../../domain/FormField";
import HttpClient from "../http/HttpClient";

export class FormFieldsGateway {
  serverBaseUrl = "http://localhost:4000";
  constructor(readonly httpClient: HttpClient) {}

  add(formId: number, field: IFormField) {
    const data = {
      formId,
      type: field.type,
      label: field.label,
      options: field.options,
    };
    const url = `${this.serverBaseUrl}/formField`;
    return this.httpClient.request(url, "PATCH", data);
  }

  updateFormField(
    label: string,
    formId: number,
    newType: FormFieldType,
    newLabel: string,
    newOptions: string[]
  ) {
    const data = {
      label,
      formId,
      newType,
      newLabel,
      newOptions,
    };
    const url = `${this.serverBaseUrl}/formField`;
    return this.httpClient.request(url, "PATCH", data);
  }

  deleteFormField(formId: number, fieldLabel: string) {
    const url = `${this.serverBaseUrl}/formField`;
    const data = {
      formId,
      fieldLabel,
    };
    return this.httpClient.request(url, "DELETE", data);
  }

  moveFieldUp(formId: number, index: number) {
    const url = `${this.serverBaseUrl}/formField/moveUp`;
    const data = {
      formId,
      index,
    };
    return this.httpClient.request(url, "PATCH", data);
  }

  moveFieldDown(formId: number, index: number) {
    const url = `${this.serverBaseUrl}/formField/moveDown`;
    const data = {
      formId,
      index,
    };
    return this.httpClient.request(url, "PATCH", data);
  }
}
