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
const RegistryDTO_1 = __importDefault(require("../../domain/dto/RegistryDTO"));
class RegistryDAODatabase {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
    }
    getRegistries(formId) {
        return __awaiter(this, void 0, void 0, function* () {
            const registriesData = yield this.databaseConnection.query('select * from formfy.registry where form_id = $1', [formId]);
            const registries = registriesData.map((registryData) => new RegistryDTO_1.default(registryData.id, registryData.form_id));
            return registries;
        });
    }
    getRegistryFields(registryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const registryFieldsData = yield this.databaseConnection.query('select * from formfy.registry_field where registry_id = $1', [registryId]);
            return registryFieldsData;
        });
    }
}
exports.default = RegistryDAODatabase;
