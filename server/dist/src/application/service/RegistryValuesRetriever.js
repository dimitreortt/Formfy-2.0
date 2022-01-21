"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegistryValuesRetriever {
    static retrieve(registryFieldsData) {
        const values = {};
        for (const registryFieldData of registryFieldsData) {
            values[registryFieldData.label] = registryFieldData.value;
        }
        return values;
    }
}
exports.default = RegistryValuesRetriever;
