import FormField from "../../domain/entitites/FormField";

export class AddFormFieldInput {
  constructor(readonly formId: number, readonly field: FormField) {}
}
