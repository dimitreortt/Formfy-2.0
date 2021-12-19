import FormRepository from '../../domain/repository/FormRepository';
import UpdateFieldInput from '../dto/UpdateFieldInput';
import FormField from '../../domain/entitites/FormField';

export default class UpdateField {
  constructor(private formRepository: FormRepository) {}

  async execute(input: UpdateFieldInput): Promise<void> {
    const newField = new FormField(input.newType, input.newLabel, input.newOptions);
    await this.formRepository.updateField(input.formId, input.label, newField);
  }
}
