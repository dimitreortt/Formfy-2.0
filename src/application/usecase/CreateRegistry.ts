import CreateFormInput from '../dto/CreateFormInput';
import CreateFormOutput from '../dto/CreateFormOutput';
import RegistryRepository from '../../domain/repository/RegistryRepository';
import Form from '../../domain/entitites/Form';
import Registry from '../../domain/entitites/Registry';
import CreateRegistryInput from '../dto/CreateRegistryInput';
import CreateRegistryOutput from '../dto/CreateRegistryOutput';
import FormDAO from '../query/FormDAO';

export default class CreateRegistry {
  constructor(private registryRepository: RegistryRepository, private formDAO: FormDAO) {}

  async execute(input: CreateRegistryInput): Promise<CreateRegistryOutput> {
    const formFieldsData = await this.formDAO.getFormFields(input.formId);

    if (formFieldsData.length !== input.values.length)
      throw new Error('Registry values list is invalid');

    //     for (const fieldData of formFieldsData) {
    //   // assure same type in fieldData and input.fields[fieldData]
    // }

    const registry = new Registry(formFieldsData, input.values);

    const registryData = await this.registryRepository.save(registry, input.formId);
    return new CreateRegistryOutput(registryData.registryId);
  }
}
