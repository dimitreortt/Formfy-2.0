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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_mem_1 = require("pg-mem");
// then use it like you would with pg-promise
class DatabaseConnectionMock {
    constructor() { }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            const pgp = yield (0, pg_mem_1.newDb)().adapters.createPgPromise();
            yield pgp.connect();
            yield pgp.query(`
    CREATE SCHEMA formfy;

    CREATE TABLE formfy.form (  
      id serial primary key,
      name text unique not null
    );
    
    
    CREATE TABLE formfy.form_field (
      id serial primary key,
      form_id integer not null,
      label text not null,
      type text not null,
      options text,
      unique (form_id, label)
    );
    
    CREATE TABLE formfy.registry (
      id serial primary key,
      form_id integer not null  
    );
    
    CREATE TABLE formfy.registry_field (
      registry_id integer not null,
      label text not null,
      value text not null,
      unique (registry_id, label)
    );
    `);
            // colocar um TypeORM vai mudar tudo...
            this.pgp = pgp;
            return this;
        });
    }
    query(statement, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pgp.query(statement, params);
            return result;
        });
    }
}
exports.default = DatabaseConnectionMock;
//ALTER TABLE tablename ADD CONSTRAINT constraintname UNIQUE (columns);
