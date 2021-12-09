import CreateFormInput from '../dto/CreateFormInput';
import CreateFormOutput from '../dto/CreateFormOutput';
import FormRepository from '../../domain/repository/FormRepository';
import Form from '../../domain/entitites/Form';

export default class CreateForm {
  constructor(private formRepository: FormRepository) {}

  async execute(input: CreateFormInput): Promise<CreateFormOutput> {
    const form = new Form(input.name);
    await this.formRepository.save(form);
    return new CreateFormOutput(input.name);
  }
}
