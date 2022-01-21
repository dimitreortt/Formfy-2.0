"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateFieldInput {
    constructor(label, formId, newType, newLabel, newOptions) {
        this.label = label;
        this.formId = formId;
        this.newType = newType;
        this.newLabel = newLabel;
        this.newOptions = newOptions;
    }
}
exports.default = UpdateFieldInput;
