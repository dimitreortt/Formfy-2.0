"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormFieldDTO {
    constructor(form_id, id, label, type, options) {
        this.form_id = form_id;
        this.id = id;
        this.label = label;
        this.type = type;
        this.options = options;
    }
}
exports.default = FormFieldDTO;
