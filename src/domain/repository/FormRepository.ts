import Form from '../entitites/Form';
import FormDTO from '../../application/dto/FormDTO';

export default interface FormRepository {
  save(form: Form): Promise<FormDTO>;
  update(formName: string, newForm: Form): Promise<FormDTO>;
  delete(formId: number): Promise<void>;
  deleteFields(formId: number): Promise<void>;
  // getByName(name: string): Promise<Form>;
}
