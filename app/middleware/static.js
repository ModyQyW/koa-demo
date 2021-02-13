const fs = require('fs');
const path = require('path');
const mime = require('mime');

const getStaticMiddleware = () => {
  return async (ctx, next) => {
    const { url } = ctx.request;
    if (url.startsWith('/static')) {
      const fileName = url.slice(8);
      const filePath = path.resolve('app', 'static', fileName);
      const isExisted = fs.existsSync(filePath);
      console.log(fileName, isExisted);
      if (isExisted) {
        ctx.response.type = mime.getType(fileName);
        ctx.response.body = fs.readFileSync(filePath, {
          encoding: 'utf8',
        });
      } else {
        ctx.response.status = 404;
      }
    } else {
      await next();
    }
  };
};

module.exports = getStaticMiddleware();
