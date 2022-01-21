"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Registry {
    constructor(fields, inputs) {
        this.fields = fields;
        this.inputs = inputs;
        this.values = {};
        let index = 0;
        for (const field of fields) {
            this.values[field.label] = inputs[index++];
        }
    }
}
exports.default = Registry;
