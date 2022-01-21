"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormFieldOptionsParser {
    static parse(options) {
        return JSON.parse(options || '[]');
    }
}
exports.default = FormFieldOptionsParser;
