import CreateFormInput from '../dto/CreateFormInput';
import CreateFormOutput from '../dto/CreateFormOutput';
import RegistryRepository from '../../domain/repository/RegistryRepository';
import Form from '../../domain/entitites/Form';
import Registry from '../../domain/entitites/Registry';
import CreateRegistryInput from '../dto/CreateRegistryInput';
import CreateRegistryOutput from '../dto/CreateRegistryOutput';
import FormDAO from '../query/FormDAO';
import RegistryInputsValidator from '../service/RegistryInputsValidator';

export default class CreateRegistry {
  constructor(private registryRepository: RegistryRepository, private formDAO: FormDAO) {}

  async execute(input: CreateRegistryInput): Promise<CreateRegistryOutput> {
    const formFieldsData = await this.formDAO.getFormFields(input.formId);
    RegistryInputsValidator.validate(formFieldsData, input.values);
    const registry = new Registry(formFieldsData, input.values);
    const registryData = await this.registryRepository.save(registry, input.formId);
    return new CreateRegistryOutput(registryData.registryId);
  }
}
