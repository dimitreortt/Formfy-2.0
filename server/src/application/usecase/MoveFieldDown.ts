import FormRepository from '../../domain/repository/FormRepository';
import MoveFieldDownInput from '../dto/MoveFieldDownInput';

export default class MoveFieldDown {
  constructor(readonly formRepository: FormRepository) {}

  async execute(input: MoveFieldDownInput) {
    const fieldsCount = await this.formRepository.formFieldsCount(input.formId);
    if (input.fieldIndex >= fieldsCount - 1)
      throw new Error('Cannot move down a field with the last index');
    await this.formRepository.swapIndexes(input.formId, input.fieldIndex, input.fieldIndex + 1);
  }
}
