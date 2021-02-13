const Router = require('koa-router');
const { signIn, renew, signOut } = require('./controller/auth');

const router = new Router();

router.post('/api/auth/sign-in', signIn);
router.post('/api/auth/renew', renew);
router.post('/api/auth/sign-out', signOut);

module.exports = router.routes();
