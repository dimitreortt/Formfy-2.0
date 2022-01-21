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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Registry_1 = __importDefault(require("../../domain/entitites/Registry"));
const CreateRegistryOutput_1 = __importDefault(require("../dto/CreateRegistryOutput"));
const RegistryInputsValidator_1 = __importDefault(require("../service/RegistryInputsValidator"));
class CreateRegistry {
    constructor(registryRepository, formDAO) {
        this.registryRepository = registryRepository;
        this.formDAO = formDAO;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const formFieldsData = yield this.formDAO.getFormFields(input.formId);
            RegistryInputsValidator_1.default.validate(formFieldsData, input.values);
            const registry = new Registry_1.default(formFieldsData, input.values);
            const registryData = yield this.registryRepository.save(registry, input.formId);
            return new CreateRegistryOutput_1.default(registryData.registryId);
        });
    }
}
exports.default = CreateRegistry;
