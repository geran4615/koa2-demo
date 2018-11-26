const Koa = require('Koa');
const Router = require('koa-router');
const bodyParse = require('koa-bodyparser');
//const logger = require('koa-logger');
const server = require('koa-static')

const app = new Koa();
const router = new Router();

router.get('/', ctx => {
  ctx.body = '<form action="/login" method="post"> \
                <input name="name"> \
                <input name="password" type="password"> \
                <input type="submit" value="Submit"> \
              </form>'
});

router.post('/login', (ctx, next) => {
  const name = ctx.request.body.name;
  const password = ctx.request.body.password;
  ctx.body = 'name = ' + name + '; ' + 'password = ' + password;
});

app.use(server(__dirname + '/static', {extensions: ['html']}));
//app.use(convert(logger()));
app.use(async (ctx, next) => {
  const start = +new Date();
  await next();
  const ms = +new Date() - start;
  console.log(`${ctx.method}  ${ctx.host}${ctx.url} - ${ms}ms`);
})
app.use(bodyParse()); // bodyParser中间件要在router之前加载才会生效
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);

console.log('Server running on http://localhost:3000');
