const Koa = require('Koa');
const app = new Koa();

app.use(async (ctx, next) => {
  let start = +new Date;
  ctx.body = 'Hello World';
  let ms = +new Date - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

app.listen(3000);

console.log('Server running on http://localhost:3000');
