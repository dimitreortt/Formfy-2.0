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
const Form_1 = __importDefault(require("../../domain/entitites/Form"));
const UpdateFormOutput_1 = __importDefault(require("../dto/UpdateFormOutput"));
class UpdateForm {
    constructor(formRepository) {
        this.formRepository = formRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const newForm = new Form_1.default(input.newName);
            const formData = yield this.formRepository.update(input.name, newForm);
            return new UpdateFormOutput_1.default(formData.name, formData.id);
        });
    }
}
exports.default = UpdateForm;
