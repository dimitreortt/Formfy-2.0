import Form from '../entitites/Form';
import FormDTO from '../../application/dto/FormDTO';
import FormField from '../entitites/FormField';

export default interface FormRepository {
  save(form: Form): Promise<FormDTO>;
  update(formName: string, newForm: Form): Promise<FormDTO>;
  delete(formId: number): Promise<void>;
  deleteFields(formId: number): Promise<void>;
  updateField(formId: number, fieldName: string, newField: FormField): Promise<void>;
  // getByName(name: string): Promise<Form>;
}
