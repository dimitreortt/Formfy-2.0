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
const FormRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/FormRepositoryDatabase"));
const DatabaseConnectionMock_1 = __importDefault(require("../mocks/DatabaseConnectionMock"));
let databaseConnection;
let formRepositoryDatabase;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    databaseConnection = yield new DatabaseConnectionMock_1.default().build();
    formRepositoryDatabase = new FormRepositoryDatabase_1.default(databaseConnection);
}));
test('Should delete fields from db based on formId', () => __awaiter(void 0, void 0, void 0, function* () {
    const FORM_ID = 1;
    const fields = [
        {
            formId: FORM_ID,
            label: 'Color',
            type: 'Short Text',
        },
        {
            formId: FORM_ID,
            label: 'Darkness',
            type: 'Short Text',
        },
    ];
    for (const field of fields) {
        yield databaseConnection.query('insert into formfy.form_field (form_id, label, type) values ($1, $2, $3);', [field.formId, field.label, field.type, '']);
    }
    yield formRepositoryDatabase.deleteFields(FORM_ID);
    const fieldsData = databaseConnection.query('select * from formfy.form_field where form_id = $1;', [FORM_ID]);
    expect(fieldsData).toMatchObject({});
}));
// fazer o caso de formulário não existe no GetFormTest
