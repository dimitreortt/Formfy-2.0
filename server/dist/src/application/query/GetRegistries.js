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
const GetRegistriesOutput_1 = __importDefault(require("../dto/GetRegistriesOutput"));
const RegistryDTO_1 = __importDefault(require("../../domain/dto/RegistryDTO"));
const GetRegistryOutput_1 = __importDefault(require("../dto/GetRegistryOutput"));
const RegistryValuesRetriever_1 = __importDefault(require("../service/RegistryValuesRetriever"));
class GetRegistries {
    constructor(registryDAO) {
        this.registryDAO = registryDAO;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const registriesData = yield this.registryDAO.getRegistries(input.formId);
            const output = [];
            for (const registryData of registriesData) {
                const registryFieldsData = yield this.registryDAO.getRegistryFields(registryData.registryId);
                const values = RegistryValuesRetriever_1.default.retrieve(registryFieldsData);
                output.push(new GetRegistryOutput_1.default(new RegistryDTO_1.default(registryData.registryId, input.formId), values));
            }
            return new GetRegistriesOutput_1.default(output);
        });
    }
}
exports.default = GetRegistries;
