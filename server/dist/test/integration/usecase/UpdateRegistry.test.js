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
const CreateRegistryInput_1 = __importDefault(require("../../../src/application/dto/CreateRegistryInput"));
const RegistryRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/RegistryRepositoryDatabase"));
const CreateRegistry_1 = __importDefault(require("../../../src/application/usecase/CreateRegistry"));
const UpdateRegistry_1 = __importDefault(require("../../../src/application/usecase/UpdateRegistry"));
const GetRegistries_1 = __importDefault(require("../../../src/application/query/GetRegistries"));
const RegistryDAODatabase_1 = __importDefault(require("../../../src/infra/dao/RegistryDAODatabase"));
const GetRegistriesInput_1 = __importDefault(require("../../../src/application/dto/GetRegistriesInput"));
const UpdateRegistryInput_1 = __importDefault(require("../../../src/application/dto/UpdateRegistryInput"));
let databaseConnection;
let formRepositoryDatabase;
let createForm;
let registryRepositoryDatabase;
let formDAO;
let createRegistry;
let getRegistries;
let registryDAO;
let updateRegistry;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
    formDAO = new FormDAODatabase_1.default(databaseConnection);
    registryDAO = new RegistryDAODatabase_1.default(databaseConnection);
    formRepositoryDatabase = new FormRepositoryDatabase_1.default(databaseConnection);
    registryRepositoryDatabase = new RegistryRepositoryDatabase_1.default(databaseConnection);
    createForm = new CreateForm_1.default(formRepositoryDatabase);
    createRegistry = new CreateRegistry_1.default(registryRepositoryDatabase, formDAO);
    updateRegistry = new UpdateRegistry_1.default(registryRepositoryDatabase);
    getRegistries = new GetRegistries_1.default(registryDAO);
}));
test('Should update a registry field, change chosen color from Yellow to Green in list selection', () => __awaiter(void 0, void 0, void 0, function* () {
    const listSelectionOptions = ['Yellow', 'Green', 'Blue', 'Marsala'];
    const field = new FormField_1.default('List Selection', 'Color', listSelectionOptions);
    const createFormInput = new CreateFormInput_1.default('Paint', [field]);
    const createFormOutput = yield createForm.execute(createFormInput);
    const createRegistryInput = new CreateRegistryInput_1.default(createFormOutput.formId, ['Yellow']);
    const createRegistryOutput = yield createRegistry.execute(createRegistryInput);
    const updateRegistryInput = new UpdateRegistryInput_1.default(createRegistryOutput.registryId, [
        { fieldLabel: 'Color', newValue: 'Green' },
    ]);
    yield updateRegistry.execute(updateRegistryInput);
    const getRegistriesInput = new GetRegistriesInput_1.default(createFormOutput.formId);
    const getRegistriesOutput = yield getRegistries.execute(getRegistriesInput);
    expect(getRegistriesOutput.output[0].values['Color']).toBe('Green');
}));
test('Should update two registries, update two fields in each', () => __awaiter(void 0, void 0, void 0, function* () {
    const dateField = new FormField_1.default('Date', 'Started At');
    const checkboxField = new FormField_1.default('Checkbox', 'Topics Studied', [
        'Anatomy',
        'Stress',
        'Faith',
        'Creed',
    ]);
    const createFormInput = new CreateFormInput_1.default('Seminary', [dateField, checkboxField]);
    const createFormOutput = yield createForm.execute(createFormInput);
    const startDate1 = new Date('2021-08-15T00:00:00');
    const checkedOptions1 = ['Stress', 'Faith'];
    const createRegistryInput1 = new CreateRegistryInput_1.default(createFormOutput.formId, [
        startDate1,
        checkedOptions1,
    ]);
    const checkedOptions2 = ['Anatomy', 'Stress'];
    const startDate2 = new Date('2021-12-01T00:00:00');
    const createRegistryInput2 = new CreateRegistryInput_1.default(createFormOutput.formId, [
        startDate2,
        checkedOptions2,
    ]);
    const createRegistryOutput1 = yield createRegistry.execute(createRegistryInput1);
    const createRegistryOutput2 = yield createRegistry.execute(createRegistryInput2);
    const newStartDate1 = new Date(startDate1.getTime() + 24 * 60 * 60 * 1000);
    const newCheckedOptions1 = checkedOptions1.concat(['Creed']);
    const updateRegistryInput1 = new UpdateRegistryInput_1.default(createRegistryOutput1.registryId, [
        { fieldLabel: 'Started At', newValue: newStartDate1 },
        { fieldLabel: 'Topics Studied', newValue: newCheckedOptions1 },
    ]);
    const newStartDate2 = new Date(startDate2.setDate(startDate2.getDate() + 1));
    const newCheckedOptions2 = checkedOptions2.splice(0, 1).concat(['Faith']);
    const updateRegistryInput2 = new UpdateRegistryInput_1.default(createRegistryOutput2.registryId, [
        { fieldLabel: 'Started At', newValue: newStartDate2 },
        { fieldLabel: 'Topics Studied', newValue: newCheckedOptions2 },
    ]);
    yield updateRegistry.execute(updateRegistryInput1);
    yield updateRegistry.execute(updateRegistryInput2);
    const getRegistries = new GetRegistries_1.default(registryDAO);
    const getRegistriesInput = new GetRegistriesInput_1.default(createFormOutput.formId);
    const getRegistriesOutput = yield getRegistries.execute(getRegistriesInput);
    const registry1 = getRegistriesOutput.output.find((registry) => registry.registryData.registryId === createRegistryOutput1.registryId);
    const registry2 = getRegistriesOutput.output.find((registry) => registry.registryData.registryId === createRegistryOutput2.registryId);
    if (!registry1 || !registry2)
        throw new Error('Created registries could not be retrieved!');
    //@ts-ignore
    expect(new Date(registry1.values['Started At']).getTime()).toEqual(newStartDate1.getTime());
    expect(registry1.values['Topics Studied']).toEqual(`{${newCheckedOptions1.join(',')}}`);
    //@ts-ignore
    expect(new Date(registry2.values['Started At']).getTime()).toEqual(newStartDate2.getTime());
    expect(registry2.values['Topics Studied']).toEqual(`{${newCheckedOptions2.join(',')}}`);
}));
