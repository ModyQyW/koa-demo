const Koa = require('koa');
const loggerMiddleware = require('./app/middleware/logger');
const errorMiddleware = require('./app/middleware/error');
const corsMiddleware = require('./app/middleware/cors');
const parserMiddleware = require('./app/middleware/parser');
const restifyMiddleware = require('./app/middleware/restify');
const staticMiddleware = require('./app/middleware/static');
const router = require('./app/router');

const app = new Koa();

app
  .use(loggerMiddleware)
  .use(errorMiddleware)
  .use(corsMiddleware)
  .use(parserMiddleware)
  .use(restifyMiddleware)
  .use(staticMiddleware)
  .use(router)
  .listen(3000);

console.log('app started at port 3000...');
