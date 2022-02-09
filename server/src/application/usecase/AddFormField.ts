import FormRepository from "../../domain/repository/FormRepository";
import { AddFormFieldInput } from "../dto/AddFormFieldInput";

export class AddFormField {
  constructor(readonly formRepository: FormRepository) {}

  execute(input: AddFormFieldInput) {
    return this.formRepository.addField(input.formId, input.field);
  }
}
