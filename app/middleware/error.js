const getErrorMiddleware = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      ctx.response.status = 500;
      console.error('error', error);
    }
  };
};

module.exports = getErrorMiddleware();
