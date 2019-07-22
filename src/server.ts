import Koa from 'koa';

import Router from 'koa-router';
import KoaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'

import errorHandler from './middleware/errorHandler'

import { db } from './mongodb' // 引入mongodb

db() // 链接数据库并且初始化数据模型

const GraphqlRouter = require('./router/idnex')

const app = new Koa();
const router = new Router();

// 使用 bodyParser 和 KoaStatic 中间件
app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

// 使用 graphql 构建api查询路由
router.use('', GraphqlRouter.routes())
app.use(router.routes());

// 统一的异常处理
app.on('error', errorHandler);
// 由于 404 是不会抛出异常的，导致 errorHandler 不会处理 404页面。
// 所以要手动抛出 404异常
app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404 && !ctx.body) {
        let createError = require('http-errors')
        ctx.app.emit('error', createError(404, 'no page.'), ctx)// ctx.throw(404);
    }
});

app.listen(3000);



console.log('Server running on port 3000');