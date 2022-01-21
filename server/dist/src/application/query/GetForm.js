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
const GetFormOutput_1 = __importDefault(require("../dto/GetFormOutput"));
class GetForm {
    constructor(formDAO) {
        this.formDAO = formDAO;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = yield this.formDAO.getForm(input.name);
            if (!formData)
                throw new Error('Form does not exist');
            // aqui dá pra mandar um assembly, pq tem que fazer a parte de adicionar os formFields tbm
            const formFields = yield this.formDAO.getFormFields(formData.id);
            return new GetFormOutput_1.default(formData, formFields);
        });
    }
}
exports.default = GetForm;
