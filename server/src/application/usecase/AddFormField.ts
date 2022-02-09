import FormRepository from "../../domain/repository/FormRepository";
import { AddFormFieldInput } from "../dto/AddFormFieldInput";

export class AddFormField {
  constructor(readonly formRepository: FormRepository) {}

  async execute(input: AddFormFieldInput) {}
}
