import Form from "../entitites/Form";
import FormDTO from "../dto/FormDTO";
import FormField from "../entitites/FormField";
import FormFieldDTO from "../dto/FormFieldDTO";

export default interface FormRepository {
  save(form: Form): Promise<FormDTO>;
  update(formName: string, newForm: Form): Promise<FormDTO>;
  delete(formId: number): Promise<void>;
  deleteFields(formId: number): Promise<void>;
  updateField(
    formId: number,
    fieldName: string,
    newField: FormField
  ): Promise<void>;
  deleteField(formId: number, label: string): Promise<FormFieldDTO>;
  formFieldsCount(formId: number): Promise<number>;
  updateFieldIndex(
    formId: number,
    oldIndex: number,
    newIndex: number
  ): Promise<void>;
  swapIndexes(formId: number, index: number, indexB: number): Promise<void>;
  addField(formId: number, field: FormField): Promise<FormFieldDTO>;

  // getByName(name: string): Promise<Form>;
}
