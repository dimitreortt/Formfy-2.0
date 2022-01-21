import FormRepository from '../../domain/repository/FormRepository';
import DeleteFieldInput from '../dto/DeleteFieldInput';

export default class DeleteField {
  constructor(private formRepository: FormRepository) {}

  async execute(input: DeleteFieldInput): Promise<void> {
    await this.formRepository.deleteField(input.formId, input.label);
  }
}
