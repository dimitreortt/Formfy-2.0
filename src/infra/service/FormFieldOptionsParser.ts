export default class FormFieldOptionsParser {
  static parse(options: string) {
    return JSON.parse(options || '[]');
  }
}
