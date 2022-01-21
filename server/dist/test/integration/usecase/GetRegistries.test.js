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
const CreateForm_1 = __importDefault(require("../../../src/application/usecase/CreateForm"));
const CreateRegistry_1 = __importDefault(require("../../../src/application/usecase/CreateRegistry"));
const CreateFormInput_1 = __importDefault(require("../../../src/application/dto/CreateFormInput"));
const FormDAODatabase_1 = __importDefault(require("../../../src/infra/dao/FormDAODatabase"));
const DatabaseConnectionMock_1 = __importDefault(require("../../mocks/DatabaseConnectionMock"));
const FormRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/FormRepositoryDatabase"));
const RegistryRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/RegistryRepositoryDatabase"));
const FormField_1 = __importDefault(require("../../../src/domain/entitites/FormField"));
const CreateRegistryInput_1 = __importDefault(require("../../../src/application/dto/CreateRegistryInput"));
const GetRegistriesInput_1 = __importDefault(require("../../../src/application/dto/GetRegistriesInput"));
const RegistryDAODatabase_1 = __importDefault(require("../../../src/infra/dao/RegistryDAODatabase"));
const GetRegistries_1 = __importDefault(require("../../../src/application/query/GetRegistries"));
let createForm;
let formRepositoryDatabase;
let databaseConnection;
let createRegistry;
let formId;
let registryDAO;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
    formRepositoryDatabase = new FormRepositoryDatabase_1.default(databaseConnection);
    createForm = new CreateForm_1.default(formRepositoryDatabase);
    const registryRepositoryDatabase = new RegistryRepositoryDatabase_1.default(databaseConnection);
    const formDAO = new FormDAODatabase_1.default(databaseConnection);
    createRegistry = new CreateRegistry_1.default(registryRepositoryDatabase, formDAO);
    const listSelectionOptions = ['Small', 'Big', 'Medium'];
    const fields = [
        new FormField_1.default('Short Text', 'Number of patches'),
        new FormField_1.default('List Selection', 'Type', listSelectionOptions),
    ];
    const createFormInput = new CreateFormInput_1.default('Stock Analysis', fields);
    const createFormOutput = yield createForm.execute(createFormInput);
    formId = createFormOutput.formId;
    registryDAO = new RegistryDAODatabase_1.default(databaseConnection);
}));
test('Should get registries from form id', () => __awaiter(void 0, void 0, void 0, function* () {
    const createRegistryInput1 = new CreateRegistryInput_1.default(formId, ['5', 'Small']);
    const createRegistryInput2 = new CreateRegistryInput_1.default(formId, ['9', 'Big']);
    yield createRegistry.execute(createRegistryInput1);
    yield createRegistry.execute(createRegistryInput2);
    const getRegistries = new GetRegistries_1.default(registryDAO);
    const getRegistriesInput = new GetRegistriesInput_1.default(formId);
    const getRegistriesOutput = yield getRegistries.execute(getRegistriesInput);
    expect(getRegistriesOutput.output).toHaveLength(2);
    expect(getRegistriesOutput.output[0].values['Number of patches']).toEqual('5');
    expect(getRegistriesOutput.output[0].values['Type']).toEqual('Small');
    expect(getRegistriesOutput.output[1].values['Number of patches']).toEqual('9');
    expect(getRegistriesOutput.output[1].values['Type']).toEqual('Big');
}));
