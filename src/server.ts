import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/*', async (ctx) => {
    console.log('1232')
	debugger
    ctx.body = 'hello world21';
});

app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');