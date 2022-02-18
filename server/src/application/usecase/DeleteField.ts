import FormRepository from "../../domain/repository/FormRepository";
import DeleteFieldInput from "../dto/DeleteFieldInput";

export default class DeleteField {
  constructor(private formRepository: FormRepository) {}

  async execute(input: DeleteFieldInput): Promise<void> {
    const fieldCount = await this.formRepository.formFieldsCount(input.formId);

    const deletedField = await this.formRepository.deleteField(
      input.formId,
      input.label
    );

    const lastFieldIndex = fieldCount - 1;

    let iterator = deletedField.index;
    while (iterator < lastFieldIndex) {
      await this.formRepository.updateFieldIndex(
        input.formId,
        iterator + 1,
        iterator
      );
      iterator++;
    }
  }
}
