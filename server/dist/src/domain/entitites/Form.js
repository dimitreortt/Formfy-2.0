"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Form {
    constructor(name) {
        this.name = name;
        this.fields = {};
    }
    addField(field) {
        if (this.fields[field.label])
            throw new Error('Label already exists in this form');
        this.fields[field.label] = field;
    }
    getFields() {
        return this.fields;
    }
}
exports.default = Form;
