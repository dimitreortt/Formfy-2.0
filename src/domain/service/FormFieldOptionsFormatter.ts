export default class FormFieldOptionsFormatter {
  static format(options?: string[]) {
    if (options) {
      return JSON.stringify(options);
    }
    return '';
  }
}
