export class FormsAssembler {
  static assembly(rawResponse: any) {
    // API Specific conversion
    return rawResponse.forms.map((formData: any) => {
      return formData.form;
    });
  }
}
