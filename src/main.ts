import ExpressAdapter from './infra/http/ExpressAdapter';
import Router from './infra/http/Router';
import DatabaseConnectionAdapter from './infra/database/DatabaseConnectionAdapter';

const http = new ExpressAdapter();
const databaseConnection = new DatabaseConnectionAdapter();

const router = new Router(http, databaseConnection);

http.listen(3000);
