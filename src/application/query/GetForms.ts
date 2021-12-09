import FormRepository from '../../domain/repository/FormRepository';
import Form from '../../domain/entitites/Form';
import FormDAO from './FormDAO';

export default class GetForms {
  constructor(readonly formDAO: FormDAO) {}

  // async execute(): Promise<GetFormOutput[]> {
  //   const forms = await this.formDAO.getForms();

  //   return new GetFormOutput(forms)
  // }
}
