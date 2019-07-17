import Koa from 'koa';
import Router from 'koa-router';


import { db } from './mongodb' // 引入mongodb
import { fetchInfo } from './mongodb/controllers/user' // 引入info controller

db() // 链接数据库并且初始化数据模型

const app = new Koa();
const router = new Router();
router.get('/test', (ctx, next) => {
    ctx.body = "test page"
});
router.get('/student', fetchInfo)



app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');