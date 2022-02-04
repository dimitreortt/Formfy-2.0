import FormRepository from '../../domain/repository/FormRepository';
import MoveFieldUpInput from '../dto/MoveFieldUpInput';

export default class MoveFieldUp {
  constructor(readonly formRepository: FormRepository) {}

  async execute(input: MoveFieldUpInput) {
    await this.formRepository.swapIndexes(input.formId, input.fieldIndex);
  }
}
