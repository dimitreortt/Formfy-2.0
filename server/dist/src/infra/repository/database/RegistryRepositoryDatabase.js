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
const RegistryDTO_1 = __importDefault(require("../../../domain/dto/RegistryDTO"));
class RegistryRepositoryDatabase {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
    }
    save(registry, formId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [registryData,] = yield this.databaseConnection.query('insert into formfy.registry (form_id) values ($1) returning *;', [formId]);
            for (const fieldLabel in registry.values) {
                if (!registry.values[fieldLabel])
                    continue;
                yield this.databaseConnection.query('insert into formfy.registry_field (registry_id, label, value) values ($1, $2, $3) returning *;', [registryData.id, fieldLabel, registry.values[fieldLabel]]);
            }
            return new RegistryDTO_1.default(registryData.id, registryData.form_id);
        });
    }
    updateField(registryId, label, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.databaseConnection.query('update formfy.registry_field set (value) = ($1) where registry_id = $2 and label = $3;', [newValue, registryId, label]);
        });
    }
    delete(registryId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.databaseConnection.query('delete from formfy.registry where id = $1;', [registryId]);
        });
    }
    deleteFields(registryId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.databaseConnection.query('delete from formfy.registry_field where registry_id = $1;', [registryId]);
        });
    }
}
exports.default = RegistryRepositoryDatabase;
