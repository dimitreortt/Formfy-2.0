import ExpressAdapter from './infra/http/ExpressAdapter';
import Router from './infra/http/Router';
import DatabaseConnectionAdapter from './infra/database/DatabaseConnectionAdapter';

const main = async () => {
  const http = new ExpressAdapter();
  const databaseConnection = new DatabaseConnectionAdapter();
  const router = new Router(http, databaseConnection);
  http.listen(4000);
};

main();
