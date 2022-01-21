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
const FormRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/FormRepositoryDatabase"));
const DatabaseConnectionMock_1 = __importDefault(require("../../mocks/DatabaseConnectionMock"));
const CreateFormInput_1 = __importDefault(require("../../../src/application/dto/CreateFormInput"));
const CreateRegistryInput_1 = __importDefault(require("../../../src/application/dto/CreateRegistryInput"));
const FormField_1 = __importDefault(require("../../../src/domain/entitites/FormField"));
const RegistryRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/RegistryRepositoryDatabase"));
const FormDAODatabase_1 = __importDefault(require("../../../src/infra/dao/FormDAODatabase"));
let databaseConnection;
let formId;
let registryRepositoryDatabase;
let formDAO;
let createRegistry;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
    registryRepositoryDatabase = new RegistryRepositoryDatabase_1.default(databaseConnection);
    formDAO = new FormDAODatabase_1.default(databaseConnection);
    createRegistry = new CreateRegistry_1.default(registryRepositoryDatabase, formDAO);
    const formRepositoryDatabase = new FormRepositoryDatabase_1.default(databaseConnection);
    const createForm = new CreateForm_1.default(formRepositoryDatabase);
    const listSelectionOptions = ['Brazil', 'England'];
    const checkBoxOptions = ['Big', 'Crispy', 'Yellow', 'Melancholic'];
    const fields = [
        new FormField_1.default('List Selection', 'Country', listSelectionOptions),
        new FormField_1.default('Checkbox', 'Fixtures', checkBoxOptions),
    ];
    const createFormInput = new CreateFormInput_1.default('Subscription', fields);
    const createFormOutput = yield createForm.execute(createFormInput);
    formId = createFormOutput.formId;
}));
test('Should create a registry', () => __awaiter(void 0, void 0, void 0, function* () {
    const checkBoxInputs = ['Big', 'Yellow'];
    const createRegistryInput = new CreateRegistryInput_1.default(formId, ['Brazil', checkBoxInputs]);
    const output = yield createRegistry.execute(createRegistryInput);
    expect(typeof output.registryId).toBe('number');
}));
test('Should throw error when trying to create a registry with input incompatible with formfields types', () => __awaiter(void 0, void 0, void 0, function* () {
    const wrongCheckBoxInputs = 'Yellow';
    const createRegistryInput1 = new CreateRegistryInput_1.default(formId, ['Brazil', wrongCheckBoxInputs]);
    yield expect(() => __awaiter(void 0, void 0, void 0, function* () {
        yield createRegistry.execute(createRegistryInput1);
    })).rejects.toThrow(new Error('Invalid field value type in registry creation'));
}));
