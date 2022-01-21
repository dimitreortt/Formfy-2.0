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
const CreateFormInput_1 = __importDefault(require("../../../src/application/dto/CreateFormInput"));
const CreateForm_1 = __importDefault(require("../../../src/application/usecase/CreateForm"));
const FormRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/FormRepositoryDatabase"));
const DatabaseConnectionMock_1 = __importDefault(require("../../mocks/DatabaseConnectionMock"));
const FormField_1 = __importDefault(require("../../../src/domain/entitites/FormField"));
const FormDAODatabase_1 = __importDefault(require("../../../src/infra/dao/FormDAODatabase"));
const GetRegistries_1 = __importDefault(require("../../../src/application/query/GetRegistries"));
const RegistryRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/RegistryRepositoryDatabase"));
const RegistryDAODatabase_1 = __importDefault(require("../../../src/infra/dao/RegistryDAODatabase"));
const GetRegistriesInput_1 = __importDefault(require("../../../src/application/dto/GetRegistriesInput"));
const CreateRegistry_1 = __importDefault(require("../../../src/application/usecase/CreateRegistry"));
const CreateRegistryInput_1 = __importDefault(require("../../../src/application/dto/CreateRegistryInput"));
const DeleteRegistryInput_1 = __importDefault(require("../../../src/application/dto/DeleteRegistryInput"));
const DeleteRegistry_1 = __importDefault(require("../../../src/application/usecase/DeleteRegistry"));
let databaseConnection;
let formRepositoryDatabase;
let createForm;
let getRegistries;
let deleteRegistry;
let registryRepositoryDatabase;
let createRegistry;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
    formRepositoryDatabase = new FormRepositoryDatabase_1.default(databaseConnection);
    createForm = new CreateForm_1.default(formRepositoryDatabase);
    registryRepositoryDatabase = new RegistryRepositoryDatabase_1.default(databaseConnection);
    deleteRegistry = new DeleteRegistry_1.default(registryRepositoryDatabase);
    const registryDAO = new RegistryDAODatabase_1.default(databaseConnection);
    getRegistries = new GetRegistries_1.default(registryDAO);
    const formDAO = new FormDAODatabase_1.default(databaseConnection);
    createRegistry = new CreateRegistry_1.default(registryRepositoryDatabase, formDAO);
}));
test('Should delete a registry', () => __awaiter(void 0, void 0, void 0, function* () {
    const field = new FormField_1.default('List Selection', 'Color', [
        'Yellow',
        'Green',
        'Blue',
        'Cyan',
        'Cobalt',
    ]);
    const createFormInput = new CreateFormInput_1.default('Paint', [field]);
    const createFormOutput = yield createForm.execute(createFormInput);
    const createRegistryInput1 = new CreateRegistryInput_1.default(createFormOutput.formId, ['Cyan']);
    const createRegistryInput2 = new CreateRegistryInput_1.default(createFormOutput.formId, ['Cobalt']);
    const createRegistryOutput1 = yield createRegistry.execute(createRegistryInput1);
    const createRegistryOutput2 = yield createRegistry.execute(createRegistryInput2);
    const deleteRegistryInput1 = new DeleteRegistryInput_1.default(createRegistryOutput1.registryId);
    yield deleteRegistry.execute(deleteRegistryInput1);
    const getRegistriesInput = new GetRegistriesInput_1.default(createFormOutput.formId);
    const getRegistriesOutput1 = yield getRegistries.execute(getRegistriesInput);
    expect(getRegistriesOutput1.output).toHaveLength(1);
    expect(getRegistriesOutput1.output[0].values['Color']).toBe('Cobalt');
    const deleteRegistryInput2 = new DeleteRegistryInput_1.default(createRegistryOutput2.registryId);
    yield deleteRegistry.execute(deleteRegistryInput2);
    const getRegistriesOutput2 = yield getRegistries.execute(getRegistriesInput);
    expect(getRegistriesOutput2.output).toHaveLength(0);
}));
// fazer o caso de formulário não existe no GetFormTest
