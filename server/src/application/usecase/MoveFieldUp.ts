import FormRepository from '../../domain/repository/FormRepository';
import MoveFieldUpInput from '../dto/MoveFieldUpInput';

export default class MoveFieldUp {
  constructor(readonly formRepository: FormRepository) {}

  async execute(input: MoveFieldUpInput) {
    console.log(input);
    if (input.fieldIndex <= 0) throw new Error('Cannot move up a field with index 0');
    await this.formRepository.swapIndexes(input.formId, input.fieldIndex, input.fieldIndex - 1);
  }
}
