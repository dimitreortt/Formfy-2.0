import DatabaseConnection from '../../src/infra/database/DatabaseConnection';
import { newDb } from 'pg-mem';

// then use it like you would with pg-promise

export default class DatabaseConnectionMock implements DatabaseConnection {
  pgp: any;

  constructor() {}

  async build() {
    const pgp = await newDb().adapters.createPgPromise();
    await pgp.connect();

    await pgp.query(`CREATE SCHEMA formfy;

    
    CREATE TABLE formfy.form (  
      id serial primary key,
      name text unique not null
    );
    
    
    CREATE TABLE formfy.form_field (
      id serial primary key,
      form_id integer not null,
      label text not null,
      type text not null,
      options text
    );`);

    // colocar um TypeORM vai mudar tudo...

    this.pgp = pgp;
    return this;
  }

  async query(statement: string, params?: any): Promise<any> {
    const result = await this.pgp.query(statement, params);
    return result;
  }
}
