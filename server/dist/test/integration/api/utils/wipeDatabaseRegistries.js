"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wipeDatabaseRegistries = void 0;
const wipeDatabaseRegistries = (formDAO, registryDAO, registryRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const forms = yield formDAO.getForms();
    for (const form of forms) {
        const registries = yield registryDAO.getRegistries(form.id);
        for (const registry of registries) {
            yield registryRepository.deleteFields(registry.registryId);
            yield registryRepository.delete(registry.registryId);
        }
    }
});
exports.wipeDatabaseRegistries = wipeDatabaseRegistries;
