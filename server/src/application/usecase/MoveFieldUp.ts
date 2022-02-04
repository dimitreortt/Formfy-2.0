import FormRepository from '../../domain/repository/FormRepository';
import MoveFieldUpInput from '../dto/MoveFieldUpInput';

export default class MoveFieldUp {
  constructor(readonly formRepository: FormRepository) {}

  execute(input: MoveFieldUpInput) {}
}
