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
const ExpressAdapter_1 = __importDefault(require("./infra/http/ExpressAdapter"));
const Router_1 = __importDefault(require("./infra/http/Router"));
const DatabaseConnectionAdapter_1 = __importDefault(require("./infra/database/DatabaseConnectionAdapter"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const http = new ExpressAdapter_1.default();
    const databaseConnection = new DatabaseConnectionAdapter_1.default();
    const router = new Router_1.default(http, databaseConnection);
    http.listen(4000);
});
main();
