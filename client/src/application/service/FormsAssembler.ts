export class FormsAssembler {
  static assembly(rawResponse: any) {
    // API Specific conversion
    console.log(rawResponse);
    return rawResponse.forms.map((formData: any) => {
      const { form, formFields } = formData;
      return {
        ...form,
        fields: this.assemblyFormFields(formFields),
      };
    });
  }

  static assemblyFormFields(fields: any[]) {
    return fields.map((field: any) => {
      const { form_id, ...rest } = field;
      return { formId: form_id, ...rest };
    });
  }
}
