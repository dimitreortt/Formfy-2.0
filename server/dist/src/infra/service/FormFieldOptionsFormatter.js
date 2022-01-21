"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormFieldOptionsFormatter {
    static format(options) {
        if (options) {
            return JSON.stringify(options);
        }
        return '';
    }
}
exports.default = FormFieldOptionsFormatter;
