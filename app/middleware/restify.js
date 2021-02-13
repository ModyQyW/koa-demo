const getRestifyMiddleware = () => {
  return async (ctx, next) => {
    if (ctx.request.url.startsWith('/api')) {
      ctx.restify = (body = {}) => {
        ctx.response.type = 'application/json';
        ctx.response.body = {
          success: true,
          code: 'OK',
          message: '',
          ...body,
        };
      };
    }
    await next();
  };
};

module.exports = getRestifyMiddleware();
