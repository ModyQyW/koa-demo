const faker = require('faker');
const dayjs = require('dayjs');

const authObject = {
  admin: 1,
  manager: 2,
  user: 3,
  visitor: 4,
};

const signIn = async (ctx) => {
  const { username, password } = ctx.request.body;
  console.log('username', username, 'password', password);
  if (username && password && username === password) {
    if (authObject[username]) {
      ctx.restify({
        token: `${username}_${faker.fake('{{random.uuid}}')}_${dayjs().format(
          'YYYYMMDDHHmmss',
        )}`,
      });
    } else {
      ctx.restify({
        success: false,
        code: 'NO_ACCOUNT_OR_PASSWORD',
        message: '账号或密码错误',
      });
    }
  } else {
    ctx.restify({
      success: false,
      code: 'WRONG_USERNAME_OR_PASSWORD',
      message: '账号或密码错误',
    });
  }
};

const renew = async (ctx) => {
  const token = ctx.request.header['X-Token'] || '';
  if (token) {
    if (
      dayjs().add(10, 'm').valueOf() >=
      dayjs(token.slice(-14), 'YYYYMMDDHHmmss').valueOf()
    ) {
      ctx.restify({
        success: false,
        code: 'TOKEN_OUTDATED',
        message: '登录失效',
      });
    } else {
      const keys = Object.keys(authObject);
      for (let i = 0, len = keys.length; i < len; i += 1) {
        if (token.startsWith(keys[i])) {
          ctx.restify({
            token: `${keys[i]}_${faker.fake(
              '{{random.uuid}}',
            )}_${dayjs().format('YYYYMMDDHHmmss')}`,
          });
          break;
        }
      }
    }
  } else {
    ctx.restify({
      success: false,
      code: 'TOKEN_OUTDATED',
      message: '登录失效',
    });
  }
};

const signOut = async (ctx) => {
  ctx.restify();
};

module.exports = {
  signIn,
  renew,
  signOut,
};
