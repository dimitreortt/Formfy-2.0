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
const CreateRegistry_1 = __importDefault(require("../../application/usecase/CreateRegistry"));
const RegistryRepositoryDatabase_1 = __importDefault(require("../repository/database/RegistryRepositoryDatabase"));
const FormDAODatabase_1 = __importDefault(require("../dao/FormDAODatabase"));
const GetRegistries_1 = __importDefault(require("../../application/query/GetRegistries"));
const RegistryDAODatabase_1 = __importDefault(require("../dao/RegistryDAODatabase"));
const UpdateRegistry_1 = __importDefault(require("../../application/usecase/UpdateRegistry"));
const DeleteRegistry_1 = __importDefault(require("../../application/usecase/DeleteRegistry"));
const CreateRegistryInput_1 = __importDefault(require("../../application/dto/CreateRegistryInput"));
const GetRegistriesInput_1 = __importDefault(require("../../application/dto/GetRegistriesInput"));
const UpdateRegistryInput_1 = __importDefault(require("../../application/dto/UpdateRegistryInput"));
class RegistriesController {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection;
    }
    createRegistry(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRegistry = new CreateRegistry_1.default(new RegistryRepositoryDatabase_1.default(this.databaseConnection), new FormDAODatabase_1.default(this.databaseConnection));
            const createRegistryInput = new CreateRegistryInput_1.default(body.formId, body.values);
            const output = yield createRegistry.execute(createRegistryInput);
            return { status: 201, output };
        });
    }
    getRegistries(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const getRegistries = new GetRegistries_1.default(new RegistryDAODatabase_1.default(this.databaseConnection));
            const getRegistriesInput = new GetRegistriesInput_1.default(body.formId);
            const getRegistriesOutput = yield getRegistries.execute(getRegistriesInput);
            return { status: 200, output: { registries: getRegistriesOutput.output } };
        });
    }
    updateRegistry(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRegistry = new UpdateRegistry_1.default(new RegistryRepositoryDatabase_1.default(this.databaseConnection));
            const updateRegistryInput = new UpdateRegistryInput_1.default(body.registryId, body.changes);
            const output = yield updateRegistry.execute(updateRegistryInput);
            return { status: 204, output };
        });
    }
    deleteRegistry(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteRegistry = new DeleteRegistry_1.default(new RegistryRepositoryDatabase_1.default(this.databaseConnection));
            yield deleteRegistry.execute(body);
            return { status: 204, output: {} };
        });
    }
}
exports.default = RegistriesController;
